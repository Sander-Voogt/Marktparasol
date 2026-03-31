import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Tag, Package, Layers, Store, Award } from "lucide-react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Get the first variant for SKU
  const firstVariant = product.variants?.[0]
  const sku = firstVariant?.sku
  const displayItems = String(product.metadata?.displayitems || "")
  const adviesPrijs = String(product.metadata?.adviesprijs || "")

  
  // Get categories
  const categories = product.categories || []

  // Get tags
  const tags = product.tags || []

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-5">
        {/* Brand/Collection Badge */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors w-fit"
          >
            <Award className="w-4 h-4" />
            {product.collection.title}
          </LocalizedClientLink>
        )}

        {/* Product Title */}
        <Heading
          level="h1"
          className="text-2xl medium:text-3xl font-bold leading-tight text-neutral-900 tracking-tight"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {/* Subtitle if exists */}
        {product.subtitle && (
          <Text className="text-lg text-neutral-600 -mt-2">
            {product.subtitle}
          </Text>
        )}

        {/* SKU & Product Type Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          {sku && (
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4" />
              <span className="font-semibold">SKU: <span className="font-medium text-neutral-700">{sku}</span></span>
            </div>
          )}
          {/* {adviesPrijs && (
            <div className="flex items-center gap-1.5">
              <span>Adviesprijs: €<span className="font-medium text-neutral-700">{adviesPrijs}</span></span>
            </div>
          )} */}
          {displayItems && (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold" >Items per display: <span className="font-medium text-neutral-700">{displayItems}</span></span>
            </div>
          )}
          {product.type && (
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Type: <span className="font-medium text-neutral-700">{product.type.value}</span></span>
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Text
              className="text-sm text-neutral-700 leading-relaxed"
              data-testid="product-description"
            >
              {product.description}
            </Text>
          </div>
        )}

        {product.metadata?.afhalen && (
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <Text className="text-sm text-yellow-800">
              Let op: Dit product is alleen beschikbaar voor afhalen in onze winkel.
            </Text>
          </div>
        )}
          
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Store className="w-4 h-4 text-neutral-400" />
            {categories.map((cat: any) => (
              <LocalizedClientLink
                key={cat.id}
                href={`/categories/${cat.handle}`}
                className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-medium text-neutral-600 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                {cat.name}
              </LocalizedClientLink>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-neutral-400" />
            {tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-2.5 py-1 bg-gray-50 text-xs font-medium text-gray-800 rounded-full"
              >
                #{tag.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
