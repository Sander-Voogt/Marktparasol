import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { sendGTMEvent } from "@next/third-parties/google"
import { useEffect } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  
  useEffect(() => {
    if (!product || !product.id) return

    const { cheapestPrice } = getProductPrice({
      product,
      variantId: product?.variants?.[0]?.id,
    })

    if (!cheapestPrice) return

    sendGTMEvent({ ecommerce: null })
    sendGTMEvent({
      event: "view_item",
      ecommerce: {
        currency: "EUR",
        value: cheapestPrice.calculated_price,
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: cheapestPrice.calculated_price,
          },
        ],
      },
    })
  }, [])
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
