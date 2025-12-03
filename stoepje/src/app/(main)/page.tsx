import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionByHandle, getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export const metadata: Metadata = {
  title: "Stoepje bedrukte producten",
  description:
    "",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts("nl")
  const parasols = await getCollectionByHandle('stoepje-parasols')
  const kleding = await getCollectionByHandle('stoepje-kleding')

  const region = await getRegion("nl")

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <li key={parasols.id}>
            <ProductRail collection={parasols} region={region} />
          </li>
          <li key={kleding.id}>
            <ProductRail collection={kleding} region={region} />
          </li>
        </ul>
      </div>
      <div className="max-w-7xl mx-auto text-lg">

      </div>
    </>
  )
}
