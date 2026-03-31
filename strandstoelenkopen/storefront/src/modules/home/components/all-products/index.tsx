import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { listProducts } from "@lib/data/products"
import { getCanSeePrices } from "@lib/data/customer"
import PreviewPrice from "./showprice"

type AllProductsProps = {
  region: HttpTypes.StoreRegion
}

export default async function AllProducts({ region }: AllProductsProps) {
  // Fetch all products with pricing
  const { response } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 12,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    },
  })

  const products = response.products || []

  if (!products || products.length === 0) {
    return null
  }

  console.log("Fetched products for AllProducts component:", products)

  return (
    <section className="py-8 sm:py-12">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gray-900 rounded-sm"></div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900">
              Nieuwste producten
            </h2>
            <span className="hidden sm:inline text-sm text-neutral-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
              {products.length} items
            </span>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-1 text-gray-900 hover:text-gray-700 font-medium text-sm transition-colors"
          >
            Bekijk alle
            <ChevronRight className="w-4 h-4" />
          </LocalizedClientLink>
        </div>

        {/* Products Grid - All products in one div */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {products.map((product) => {
            const price = product.variants?.[0]?.calculated_price
            const formattedPrice = price
              ? new Intl.NumberFormat("nl-NL", {
                  style: "currency",
                  currency: price.currency_code || "EUR",
                }).format(price.calculated_amount || 0)
              : null

            return (
             
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  {/* Product Image */}
                   <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title || "Product"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 16vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <span className="text-4xl"></span>
                      </div>
                    )}
                  </div>
              </LocalizedClientLink>

                  {/* Product Info */}
                  <div className="p-2 sm:p-3 lg:p-4 border-t border-gray-100">
                     <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-gray-900 transition-colors line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
                      {product.title}
                    </h3>
</LocalizedClientLink>
                    {/* Price */}
                    {formattedPrice && (
                      <span className="text-sm sm:text-base font-bold text-gray-900 mt-1 sm:mt-2 block">
                        <PreviewPrice
                          price={formattedPrice}
                          product={product}
                        />
                      </span>
                    )}
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
