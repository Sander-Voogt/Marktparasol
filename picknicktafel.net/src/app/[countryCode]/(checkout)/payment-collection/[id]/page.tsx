export const dynamic = "force-dynamic"
import { sdk } from "@lib/config"
import Client from "./Client"

async function getPaymentCollection(id: string) {
  return sdk.client.fetch(`/payment-collection/${id}`)
}

async function createSession(id: string) {
  return sdk.client.fetch(`/store/payment-collections/${id}/payment-sessions`, {
    method: "POST",
    body: { provider_id: "pp_stripe_stripe" },
  })
}

export default async function Page({ params }) {

  const { id } = await params

  const pc = await getPaymentCollection(id)
  
  let paymentSession = pc.paymentCollection

  if(paymentSession.status === "completed") {
    return <h1>Betaling voldaan</h1>
  }

  if (!paymentSession.payment_sessions?.length > 0) {
    const res = await createSession(id)
    paymentSession = res.payment_collection
  }

  return <Client paymentCollection={paymentSession} />
}
