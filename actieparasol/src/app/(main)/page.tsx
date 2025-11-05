import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Sterke Markt parasol kopen",
  description: "",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts("nl")
  const region = await getRegion("nl")

  if (!collections || !region) {
    return null
  }

  console.log(collections)

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Stel je eigen parasol of tent samen
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Actieparasol.nl levert verschillende maten en kleuren parasols en
          tenten. Daarnaast kunt u zijzeilen met of zonder raam bij de parasol
          of tent in uw gewenste kleur bestellen.
        </p>
        <a
          href="/store"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Bekijk onze producten →
        </a>
      </section>
    </>
  )
}
