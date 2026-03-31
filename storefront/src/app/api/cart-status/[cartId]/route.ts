import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { cartId: string } }
) {
  try {
    const params = await context.params;
    console.log("params:", params);
    const { cartId } = params;

    const url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}`;
    console.log("Fetching cart from URL:", url);

    const res = await fetch(url, {
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
      },
    });

    console.log("Response status:", res.status, "ok:", res.ok);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.log("Error response body:", errorData);
      return NextResponse.json(
        { error: "Failed to retrieve cart", status: res.status, details: errorData },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Cart data:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Caught error:", err);
    return NextResponse.json(
      { error: "Network or server error", details: String(err) },
      { status: 500 }
    );
  }
}