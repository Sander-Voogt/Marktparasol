import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded" />
  }

  return (
    <div className="flex items-baseline gap-3">
      {/* Current Price */}
      <span
        className={clx("text-2xl font-bold", {
          "text-primary": selectedPrice.price_type === "sale",
          "text-neutral-900": selectedPrice.price_type !== "sale",
        })}
      >
        {!variant && (
          <span className="text-sm font-normal text-neutral-500 mr-1">Vanaf</span>
        )}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>

      {/* Sale Badge & Original Price */}
      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-2">
          <span
            className="text-sm text-neutral-400 line-through"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  )
}
