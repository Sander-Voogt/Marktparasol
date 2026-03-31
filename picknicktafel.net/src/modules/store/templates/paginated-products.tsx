import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  filterCategories,
  filterCollections,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  filterCategories?: string
  filterCollections?: string
  minPrice?: string
  maxPrice?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  // Handle filter categories (from RefinementList)
  if (filterCategories) {
    const categoryIds = filterCategories.split(',').filter(Boolean)
    queryParams["category_id"] = categoryIds
  } else if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  // Handle filter collections (from RefinementList)
  if (filterCollections) {
    const collectionIds = filterCollections.split(',').filter(Boolean)
    queryParams["collection_id"] = collectionIds
  } else if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  // Client-side price filtering
  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice) * 100 : 0 // Convert to cents
    const max = maxPrice ? parseFloat(maxPrice) * 100 : Infinity // Convert to cents
    
    products = products.filter((product) => {
      // Get the lowest price from all variants
      const prices = product.variants
        ?.map((v) => v.calculated_price?.calculated_amount)
        .filter((price): price is number => typeof price === 'number') || []
      
      if (prices.length === 0) return false
      
      const lowestPrice = Math.min(...prices)
      return lowestPrice >= min && lowestPrice <= max
    })
    
    count = products.length
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
