// app/api/check-order/route.ts
import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const cartId = searchParams.get("cartId")

  if (!cartId) {
    return NextResponse.json({ error: "cartId is vereist" }, { status: 400 })
  }

  try {
    // Order opzoeken puur op cart_id, zonder JWT/auth headers
    const { orders } = await sdk.store.order.list(
      { cart_id: cartId },
      { fields: "id" }
    )

    if (orders && orders.length > 0) {
      return NextResponse.json({ orderId: orders[0].id })
    }

    // Nog geen order → null
    return NextResponse.json({ orderId: null })
  } catch (err: any) {
    console.error("check-order fout:", err.message || err)
    // Bij error (bijv. 401) → gewoon zeggen dat order nog niet bestaat
    return NextResponse.json({ orderId: null })
  }
}