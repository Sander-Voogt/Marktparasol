import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import AllProducts from "@modules/home/components/all-products"
import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import FeaturedProducts from "@modules/home/components/featured-products"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { retrieveCart } from "@lib/data/cart"

export const metadata: Metadata = {
  title: "RIC Holland",
  description:
    "RIC Holland",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)
  const getCart = await retrieveCart()
  console.log(getCart, "cart in product preview")
  

  if (!region) {
    return null
  }

  const categories = await getCategoryByHandle(['houten-strandstoelen'])


  const bestsellers = {
    title: "Bestsellers",
    id: "pcol_01KEPHH47PK32PXKN120B0A12E",
    handle: "/collections/bestsellers"
  }

  const uitgelicht = {
    title: "Uitgelichte producten",
    id: "pcol_01KEPEVCP3Q9WC4N4QJ23RA784",
    handle: "/collections/uitgelichte-producten"
  }

  return (
    <>
      <Hero categories={categories.category_children} />

      {/* All Products in One Section */}
      <div className="bg-white">
        <AllProducts region={region} />
        <ProductRail collection={bestsellers} region={region} />
        <ProductRail collection={uitgelicht} region={region} />
      </div>
    </>
  )
}
