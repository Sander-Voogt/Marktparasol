import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import ProductActions from "./product-actions"
import PreviewPrice from "@modules/home/components/all-products/showprice"
import QuantitySelector from "@modules/search/components/hit/QuantitySelector"
import { addToCart, retrieveCart } from "@lib/data/cart"
import hit from "@modules/search/components/hit"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  console.log(product.calculated_price)

  return (
    <div className="group block h-full relative">
      <div
        data-testid="product-wrapper"
        className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-300"
      >
        <LocalizedClientLink
          href={`/products/${product.handle}?v_id=${product.id}`}
          className="block h-full"
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick View Badge */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                View
              </span>
            </div>
          </div>
        </LocalizedClientLink>
        {/* Product Info */}
        <div className="p-4 flex flex-col gap-y-2 flex-1">
          <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="block h-full"
          >
            <div className="flex-1">
              <h3
                className="text-sm font-semibold text-neutral-800 line-clamp-2 group-hover:text-gray-900 transition-colors duration-200 min-h-[2.5rem]"
                data-testid="product-title"
              >
                {product.title}
              </h3>
            </div>
          </LocalizedClientLink>
          {/* Price Section */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              {/* {cheapestPrice && ( */}
              <div className="text-lg font-bold text-gray-900">
                <div>€{product?.calculated_price?.calculated_amount},-</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Actions - Outside the link */}
      <div className="px-4 pb-4">
        <ProductActions product={product} />
      </div>
    </div>
  )
}
