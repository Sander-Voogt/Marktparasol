import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { ProductHit } from "../hit"

type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink
      href={`/products/${hit.handle}`}
      data-testid="search-result"
      className="block p-2 sm:p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <Text
        className="text-sm font-medium text-gray-900"
        data-testid="search-result-title"
      >
        {hit.title}
      </Text>
    </LocalizedClientLink>
  )
}

export default Hit