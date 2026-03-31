import { sdk } from "@lib/config"
import { retrieveCustomer } from "@lib/data/customer"


export const GET = async (req: Request) => {
  const customer = await retrieveCustomer()

  console.log('asdfasdfasdf')
  console.log(customer)
  if (customer) {
    return Response.json({
      authenticated: true,
      customer: customer,
    })
  }

  return Response.error()
}