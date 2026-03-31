import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { listProducts } from "@lib/data/products"

type CategoryWithProductsProps = {
  category: HttpTypes.StoreProductCategory
  region: HttpTypes.StoreRegion
}

export default async function CategoryWithProducts({ category, region }: CategoryWithProductsProps) {
  // Fetch products with pricing for this category
  const { response } = await listProducts({
    regionId: region.id,
    queryParams: {
      category_id: [category.id!],
      limit: 8,
      fields: "*variants.calculated_price",
    },
  })

  const products = response.products || []

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-8 sm:py-12 border-b border-gray-200">
      <div className="content-container">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-gray-900 rounded-sm"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {category.name}
            </h2>
            <span className="text-xs text-neutral-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              {products.length} items
            </span>
          </div>
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="inline-flex items-center gap-1 text-gray-900 hover:text-gray-700 font-medium text-sm transition-colors"
          >
            Bekijk alle
            <ChevronRight className="w-4 h-4" />
          </LocalizedClientLink>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {products.map((product) => {
            const price = product.variants?.[0]?.calculated_price
            const formattedPrice = price
              ? new Intl.NumberFormat('nl-NL', {
                  style: 'currency',
                  currency: price.currency_code || 'EUR',
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
                        alt={product.title || 'Product'}
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
                      <p className="text-base font-bold text-gray-900 mt-2">
                        {formattedPrice}
                      </p>
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
