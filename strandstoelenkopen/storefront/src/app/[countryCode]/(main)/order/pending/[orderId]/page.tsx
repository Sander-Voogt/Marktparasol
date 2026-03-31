import { redirect } from "next/navigation"
import { sdk } from "@lib/config"

async function waitForOrder(cartId: string, timeoutMs = 20000) {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const { orders } = await sdk.store.order.list({ cart_id: cartId })

    if (orders?.length) {
      return orders[0]
    }

    await new Promise((r) => setTimeout(r, 1000))
  }

  return null
}

export default async function PendingOrderPage({
  params,
}: {
  params: { cartId: string; countryCode: string }
}) {
  const order = await waitForOrder(params.cartId)

  if (order) {
    redirect(`/${params.countryCode}/order/confirmed/${order.id}`)
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1 className="text-xl font-semibold">Betaling wordt verwerkt</h1>
        <p className="text-gray-500">
          Even geduld, we verwerken je betaling…
        </p>
      </div>
    </div>
  )
}
