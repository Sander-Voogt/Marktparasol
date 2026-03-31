import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { ChevronRight } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import Image from "next/image"
import PreviewPrice from "../../all-products/showprice"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: {
    title: string,
    id: string,
    handle: string
  }

  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="content-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gray-900 rounded-sm"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              {collection.title}
            </h2>
            <span className="text-sm text-neutral-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
              {pricedProducts.length} items
            </span>
          </div>
          <LocalizedClientLink
            href={collection.handle}
            className="inline-flex items-center gap-1 text-gray-900 hover:text-gray-700 font-medium text-sm transition-colors"
          >
            Bekijk alle
            <ChevronRight className="w-4 h-4" />
          </LocalizedClientLink>
        </div>

        {/* Products Grid - All products in one div */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {pricedProducts.map((product) => {
            const price = product.variants?.[0]?.calculated_price
            const formattedPrice = price
              ? new Intl.NumberFormat("nl-NL", {
                  style: "currency",
                  currency: price.currency_code || "EUR",
                }).format(price.calculated_amount || 0)
              : null

            return (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  {/* Product Image */}
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

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-900 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                      {product.title}
                    </h3>

                    {/* Price */}
                    {formattedPrice && (
                      <div className="text-base font-bold text-gray-900 mt-2">
                        <PreviewPrice price={formattedPrice} product={product} />
                      </div>
                    )}
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}

