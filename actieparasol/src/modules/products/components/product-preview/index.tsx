import { Button, Text, clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  const productHref = `/products/${product.handle}`

  return (
    <div
      data-testid="product-wrapper"
      className={clx(
        "group flex h-full flex-col overflow-hidden rounded-rounded border border-ui-border-base bg-ui-bg-base",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        "hover:border-ui-border-strong hover:shadow-elevation-card-rest"
      )}
    >
      <LocalizedClientLink
        href={productHref}
        className="flex min-h-0 flex-1 flex-col outline-none"
      >
        <div className="shrink-0 px-4 pt-4 pb-3">
          <Text
            className="text-xl font-bold leading-snug tracking-tight text-ui-fg-base line-clamp-2"
            data-testid="product-title"
          >
            {product.title}
          </Text>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3 pb-3">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
            className="shadow-none group-hover:shadow-none rounded-medium"
          />
        </div>
      </LocalizedClientLink>

      <div className="mt-auto flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-ui-border-base bg-ui-bg-subtle px-4 py-3">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
          {cheapestPrice ? <PreviewPrice price={cheapestPrice} /> : null}
        </div>
        <LocalizedClientLink href={productHref}>
          <Button variant="secondary" size="small" data-testid="product-preview-view">
            Bekijken
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
