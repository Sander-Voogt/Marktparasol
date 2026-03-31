import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { cartId: string } }
) {

    const {cartId} = await params;
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}`,
      {
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
      }
    )

    const data = await res.json()

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed to retrieve cart", err: err }, { status: 500 })
  }
}