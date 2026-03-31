import { retrieveCustomer } from "@lib/data/customer"

export const GET = async (req: Request) => {
  const customer = await retrieveCustomer()

  if (customer) {
    return Response.json({ authenticated: true })
  }

  return Response.json({ authenticated: false }, { status: 401 })
}
