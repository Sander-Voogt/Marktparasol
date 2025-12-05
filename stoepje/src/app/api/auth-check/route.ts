import { sdk } from "@lib/config"
import { getCustomer } from "@lib/data/customer"


export const GET = async (req: Request) => {
    const customer = await getCustomer()

  console.log(customer)
  if(customer){
    return Response.json({
    authenticated: true,
  })
  } 

  return Response.error()
}