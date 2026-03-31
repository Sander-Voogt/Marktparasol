"use client"

import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { sdk } from "@lib/config"

async function getPaymentCollection(id: string) {
  return fetch(`/api/check-manual-payment/${id}`)
}

function CheckoutForm({ paymentCollection }: any) {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amount = paymentCollection.payment_sessions[0].data.amount / 100

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/nl/payment-collection/${paymentCollection.id}`,
      },
    })

    if (error) {
      setError(error.message || "Betaling mislukt")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Betaal je bestelling
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border p-4 rounded-md bg-gray-50">
          <PaymentElement />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Bezig..." : `Betaal €${amount}`}
        </button>
      </form>
    </div>
  )
}

export default function Client({ paymentCollection }: any) {
  const [status, setStatus] = useState(paymentCollection.status)

  const clientSecret =
    paymentCollection?.payment_sessions?.[0]?.data?.client_secret

  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>

    const poll = async () => {
      if (cancelled) return

      try {
        const res = await getPaymentCollection(paymentCollection.id)
        const data = await res.json()

        if (cancelled) return

        setStatus(data)

        if (data !== "completed") {
          timeout = setTimeout(poll, 1000)
        }
      } catch (err) {
        console.error(err)
        timeout = setTimeout(poll, 2000) // retry met backoff
      }
    }

    poll()

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [paymentCollection.id])

  if (status === "completed") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Betaling voldaan</p>
      </div>
    )
  }
  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Stripe niet beschikbaar</p>
      </div>
    )
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm paymentCollection={paymentCollection} />
      </Elements>
    </div>
  )
}
