import { sdk } from "@lib/config"
import { retrieveCustomer, retrieveCustomerGroups } from "@lib/data/customer"
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const group = searchParams.get('group') ?? ''; // Haalt '123' op uit /api/route?id=123

  console.log('Group param:', group);
  const customer = await retrieveCustomerGroups(group)

  console.log('asdfasdfasdf')
  console.log(customer)
  if (customer) {
    return Response.json({
      authenticated: true,
      customer: customer,
    })
  }

  return Response.json({ authenticated: false }); 
}