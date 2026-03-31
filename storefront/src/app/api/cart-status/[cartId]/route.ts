import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { cartId: string } }
) {
  const { cartId } = params; // geen await

  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}`,
      {
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to retrieve cart", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to retrieve cart", details: err },
      { status: 500 }
    );
  }
}