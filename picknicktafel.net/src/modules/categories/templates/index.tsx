import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
// RefinementList kept for future use
// import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Image from "next/image"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  categories: categoriesParam,
  collections: collectionsParam,
  minPrice,
  maxPrice,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categories?: string
  collections?: string
  minPrice?: string
  maxPrice?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  // Fetch all categories for filtering
  const allCategories = await listCategories().catch(() => [])

  // Fetch collections (brands) for filtering
  const { collections } = await listCollections({ fields: "id,title,handle,*products" }).catch(() => ({ collections: [] }))

  // Get region for currency
  const region = await getRegion(countryCode)

  // Get top-level categories (no parent), exclude "Pants"
  const topLevelCategories =
    allCategories?.filter(
      (cat: any) =>
        !cat.parent_category &&
        cat.handle?.toLowerCase() !== "pants" &&
        !cat.name?.toLowerCase().includes("pants")
    ) || []

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {/* Category Sidebar */}
      <div className="small:sticky small:top-28 w-full small:w-[260px] small:min-w-[260px] mb-6 small:mb-0 small:mr-6">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 px-1">
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Categorieën</h2>
        </div>

        <nav className="space-y-1">
          {/* All Products Link */}
          <LocalizedClientLink
            href="/store"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
            </svg>
            Alle Producten
          </LocalizedClientLink>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Category List */}
          {topLevelCategories.map((cat: any) => {
            const isActive = cat.id === category.id || cat.id === category.parent_category?.id
            const hasChildren = cat.category_children?.length > 0
            return (
              <div key={cat.id} className="group/side">
                <LocalizedClientLink
                  href={`/categories/${cat.handle}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold border-l-2 border-gray-900"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{cat.name}</span>
                  {hasChildren && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? "rotate-180" : "group-hover/side:rotate-180"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </LocalizedClientLink>
                {hasChildren && (
                  <div className={`mt-1 ml-4 pl-3 border-l-2 border-gray-200 space-y-0.5 ${isActive ? "block" : "hidden group-hover/side:block"}`}>
                    {cat.category_children.map((child: any) => {
                      const isChildActive = child.id === category.id
                      return (
                        <LocalizedClientLink
                          key={child.id}
                          href={`/categories/${child.handle}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                            isChildActive
                              ? "bg-gray-100 text-gray-900 font-semibold"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isChildActive ? "bg-gray-900" : "bg-gray-300"}`} />
                          {child.name}
                        </LocalizedClientLink>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* RefinementList kept for future use */}
      {/* <RefinementList
        sortBy={sort}
        data-testid="sort-by-container"
        categoryId={category.id}
        collections={collections}
        region={region}
        hideCategories={true}
      /> */}
      <div className="w-full small:pl-8">
        <div className="flex flex-row mb-8 gap-4 items-center">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-neutral-600 text-base">
                <LocalizedClientLink
                  className="mr-4 hover:text-gray-900 transition-colors"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title" className="text-3xl font-bold text-gray-900 tracking-tight">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base text-neutral-700">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          // <div className="mb-8">
          //   <ul className="grid grid-cols-1 gap-2">
          //     {category.category_children?.map((c) => (
          //       <li key={c.id}>
          //         <InteractiveLink href={`/categories/${c.handle}`}>
          //           {c.name}
          //         </InteractiveLink>
          //       </li>
          //     ))}
          //   </ul>
          // </div>

          <div className="overflow-hidden" >
              <div className="flex gap-3 py-3">
                {category.category_children?.map((child) => {        
                  // Access the first product from the child category directly
                  //         // because we included it in the parent's "fields" query       
                  const firstProduct = child.products?.[0]        
                  const thumbnail = firstProduct?.thumbnail

                  return (
                    <LocalizedClientLink
                      key={child.id}
                      href={`/categories/${child.handle}`}
                      className="flex-none w-[120px] sm:w-[150px] group"
                    >
                      <div className="rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 group-hover:shadow-lg">
                        {/* Image */}
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          {thumbnail ? (
                            <Image
                              src={thumbnail}
                              alt={child.name || 'Category'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="150px"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                              <span className="text-4xl"></span>
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          {/* Category name on image */}
                          <div className="absolute bottom-0 left-0 right-0 p-2.5">
                            <h3 className="font-semibold text-white text-sm text-center drop-shadow-md">
                              {child.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </LocalizedClientLink>
                  )
                })}
                {/* View All Card */}
                {/* <LocalizedClientLink
                  href="/store"
                  className="flex-none w-[120px] sm:w-[150px] group"
                >
                  <div className="rounded-xl overflow-hidden border border-primary bg-primary hover:bg-primary-dark transition-all duration-300 h-full">
                    <div className="aspect-square flex flex-col items-center justify-center p-4">
                      <span className="text-3xl sm:text-4xl mb-2"></span>
                      <h3 className="font-semibold text-white text-sm text-center">
                        Alle Producten
                      </h3>
                      <p className="text-xs text-white/70 mt-1">Bekijk alles</p>
                    </div>
                  </div>
                </LocalizedClientLink> */}
              </div>
            </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
            filterCollections={collectionsParam}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </Suspense>
      </div>
    </div>
  )
}
