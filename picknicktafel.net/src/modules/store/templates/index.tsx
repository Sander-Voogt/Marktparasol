import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
// RefinementList kept for future use
// import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categories?: string
  collections?: string
  minPrice?: string
  maxPrice?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="py-4 sm:py-6 lg:py-8 content-container"
      data-testid="category-container"
    >
      {/* RefinementList kept for future use */}
      {/* <RefinementList sortBy={sort} categories={categories} collections={collections} region={region} /> */}

      <div className="w-full">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 data-testid="store-page-title" className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Alle producten</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
