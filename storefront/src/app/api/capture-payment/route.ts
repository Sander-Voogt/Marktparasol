import { placeOrder, retrieveCart } from "@lib/data/cart"
import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"

type Params = Promise<{ cartId: string }>

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { searchParams } = req.nextUrl

  const origin = process.env.NEXT_PUBLIC_BASE_URL
  const paymentIntent = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get(
    "payment_intent_client_secret"
  )
  const redirectStatus = searchParams.get("redirect_status") || ""
  const countryCode = searchParams.get("country_code")

  const cart = await retrieveCart()

  // const paymentSession = cart.payment_collection?.payment_sessions?.find(
  //   (payment) => payment.data.id === paymentIntent
  // )

  // if (
  //   !paymentSession ||
  //   paymentSession.data.client_secret !== paymentIntentClientSecret ||
  //   !["pending", "succeeded"].includes(redirectStatus) ||
  //   !["pending", "authorized"].includes(paymentSession.status)
  // ) {
  //   return redirect(
  //     `${origin}/checkout/return?cart_id=${cart.id}`
  //   )
  // }

  // const order = await placeOrder(cart.id)

  return NextResponse.redirect(
    `${origin}/checkout/return`
  )
}