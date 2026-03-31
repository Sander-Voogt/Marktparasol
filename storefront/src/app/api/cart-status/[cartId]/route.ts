import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cartId: string } }
) {
  const { cartId } = params;

  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}`,
      {
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
      }
    );

    // HTTP status check
    if (!res.ok) {
      const errorData = await res.json().catch(() => null); // fallback als body geen JSON is
      return NextResponse.json(
        { error: "Failed to retrieve cart", status: res.status, details: errorData },
        { status: res.status }
      );
    }

    // 200 OK, return de data
    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    // echte netwerkfouten
    return NextResponse.json(
      { error: "Network or server error", details: err },
      { status: 500 }
    );
  }
}