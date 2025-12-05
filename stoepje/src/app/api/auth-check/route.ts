import { sdk } from "@lib/config"


export const GET = async (req: Request) => {
  const customer = sdk.store.customer.retrieve()

  console.log(customer)

  return Response.json({
    authenticated: true,
    customer_id: customer,
  })
}