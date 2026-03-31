"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { getCartId } from "@lib/data/cookies"

export default function Page({ searchParams }: { searchParams: { cart_id?: string, payment_intent?: string } }) {
  const router = useRouter()
  const paymentIntent = searchParams.payment_intent // optional, as passed

  const [status, setStatus] = useState<"checking" | "success" | "failed" | "timeout">("checking")
  const [message, setMessage] = useState("We controleren je betaling... even geduld aub.")

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 15 // ~30 seconds
    const intervalMs = 2000

    const poll = async () => {
      try {
        const res = await fetch(`/api/cart-status/`)
        const { cart } = await res.json()

        // Check if payment session is authorized/captured
        const paymentSession = ["authorized", "captured", "completed"].includes(cart.payment_collection.status)
        const paymentSession2 = cart.payment_collection.status
        console.log('paymentsession', paymentSession, paymentSession2)

        if (paymentSession) {
          setStatus("success")
          setMessage("Betaling succesvol! Je wordt doorgestuurd...")

          // Ensure placeOrder is successfully called before redirecting
          try {
            const order = await placeOrder()
            if (order?.id) {
              setTimeout(() => {
                router.push(`/order/confirmed/${order.id}`)
              }, 1500)
            } else {
              throw new Error("Order ID is missing")
            }
          } catch (err) {
            console.error("Error placing order:", err)
            // setStatus("failed")
            // setMessage("Er ging iets mis bij het plaatsen van de bestelling. Probeer het opnieuw.")
            // setTimeout(() => router.push("/checkout?error=order_issue"), 4000)
          }
          return
        }

        // Handle payment failure
        if (["error", "canceled", "requires_payment_method"].includes(cart.payment_collection.status)) {
          setStatus("failed")
          setMessage("Er ging iets mis met de betaling. Je wordt terug naar de winkelwagen gestuurd.")
          setTimeout(() => router.push("/checkout?error=payment_issue&step=review"), 4000)
        }

        // If not completed yet → retry
        if (attempts++ < maxAttempts) {
          setTimeout(poll, intervalMs)
        } else {
          setStatus("timeout")
          setMessage("Het duurt langer dan verwacht. Controleer je order status later in je account.")
        }
      } catch (err) {
        console.error(err)
        setStatus("failed")
        setMessage("Er ging iets mis met de betaling. Je wordt terug naar de winkelwagen gestuurd.")
        setTimeout(() => router.push("/checkout?error=payment_issue&step=review"), 4000)
      }
    }

    poll()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        {status === "checking" && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-6"></div>
        )}
        <h1 className="text-2xl font-bold mb-4">
          {status === "success" ? "Gelukt!" : status === "failed" || status === "timeout" ? "Oeps..." : "Even geduld..."}
        </h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}