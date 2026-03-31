import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"

type CategoriesSectionProps = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Filter out categories with parent (only show top-level)
  const topLevelCategories = categories.filter((cat) => !cat.parent_category)

  if (!topLevelCategories || topLevelCategories.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
    </section>
  )
}
