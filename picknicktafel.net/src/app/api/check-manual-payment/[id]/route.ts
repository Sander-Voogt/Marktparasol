import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

async function getPaymentCollection(id: string) {
  return sdk.client.fetch(`/payment-collection/${id}`)
}

async function createSession(id: string) {
  return sdk.client.fetch(`/store/payment-collections/${id}/payment-sessions`, {
    method: "POST",
    body: { provider_id: "pp_stripe_stripe" },
  })
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) { const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""
  const { searchParams } = req.nextUrl

      const { id } = await params
        const redirectOrigin = BASE_URL || req.nextUrl.origin
  const countryCode = searchParams.get("country_code") || "nl"


    console.log('ddd', id)

const pc = await getPaymentCollection(id)
  
  let paymentSession = pc.paymentCollection
    
        return NextResponse.json(paymentSession.status ) 

}




  
