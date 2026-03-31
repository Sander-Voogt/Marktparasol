"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { X, SlidersHorizontal } from "lucide-react"

import SortProducts, { SortOptions } from "./sort-products"
import FilterCheckboxGroup from "./filter-checkbox-group"
import PriceRangeSlider from "./price-range-slider"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
  categoryId?: string
  region?: HttpTypes.StoreRegion | null
  hideCategories?: boolean
}

const RefinementList = ({
  sortBy,
  'data-testid': dataTestId,
  categories = [],
  collections = [],
  categoryId,
  region,
  hideCategories = false
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currencyCode = region?.currency_code?.toUpperCase() || "USD"
  const currencySymbol = region?.currency_code === "dkk" ? "kr " :
                         region?.currency_code === "eur" ? "€" :
                         region?.currency_code === "gbp" ? "£" : "$"

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(200)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from URL params (only once)
  useEffect(() => {
    if (isInitialized) return

    const cats = searchParams.get('categories')?.split(',').filter(Boolean)
    const colls = searchParams.get('collections')?.split(',').filter(Boolean)
    const min = parseInt(searchParams.get('minPrice') || '0')
    const max = parseInt(searchParams.get('maxPrice') || '200')

    if (!cats && categories.length > 0) {
      const allCategoryIds = categories
        .filter(cat => !categoryId || cat.id !== categoryId)
        .map(cat => cat.id)
      setSelectedCategories(allCategoryIds)
    } else if (cats) {
      setSelectedCategories(cats)
    }

    if (!colls && collections.length > 0) {
      const allCollectionIds = collections.map(coll => coll.id!).filter(Boolean)
      setSelectedCollections(allCollectionIds)
    } else if (colls) {
      setSelectedCollections(colls)
    }

    setPriceMin(min)
    setPriceMax(max)
    setIsInitialized(true)
  }, [isInitialized, searchParams, categories.length, collections.length, categoryId])

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams)

      Object.entries(updates).forEach(([name, value]) => {
        if (value === null || value === '') {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      })

      return params.toString()
    },
    [searchParams]
  )

  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    const query = createQueryString(updates)
    router.push(`${pathname}?${query}`, { scroll: false })
  }, [createQueryString, pathname, router])

  const setQueryParams = (name: string, value: string) => {
    updateFilters({ [name]: value })
  }

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values)

    const allCategoryIds = categories
      .filter(cat => !categoryId || cat.id !== categoryId)
      .map(cat => cat.id)

    const shouldClearFilter = values.length === 0 || values.length === allCategoryIds.length

    updateFilters({
      categories: shouldClearFilter ? null : values.join(','),
      page: null
    })
  }

  const handleCollectionChange = (values: string[]) => {
    setSelectedCollections(values)

    const allCollectionIds = collections.map(coll => coll.id!).filter(Boolean)

    const shouldClearFilter = values.length === 0 || values.length === allCollectionIds.length

    updateFilters({
      collections: shouldClearFilter ? null : values.join(','),
      page: null
    })
  }

  const handlePriceChange = (min: number, max: number) => {
    setPriceMin(min)
    setPriceMax(max)
    updateFilters({
      minPrice: min > 0 ? min.toString() : null,
      maxPrice: max < 200 ? max.toString() : null,
      page: null
    })
  }

  const clearAllFilters = () => {
    const allCategoryIds = categories
      .filter(cat => !categoryId || cat.id !== categoryId)
      .map(cat => cat.id)
    const allCollectionIds = collections.map(coll => coll.id!).filter(Boolean)

    setSelectedCategories(allCategoryIds)
    setSelectedCollections(allCollectionIds)
    setPriceMin(0)
    setPriceMax(200)
    updateFilters({
      categories: null,
      collections: null,
      minPrice: null,
      maxPrice: null,
      page: null
    })
  }

  // Calculate active filter count
  const allCategoryIds = categories
    .filter(cat => !categoryId || cat.id !== categoryId)
    .map(cat => cat.id)
  const allCollectionIds = collections.map(coll => coll.id!).filter(Boolean)

  const categoryFilterActive = selectedCategories.length > 0 &&
    selectedCategories.length < allCategoryIds.length
  const collectionFilterActive = selectedCollections.length > 0 &&
    selectedCollections.length < allCollectionIds.length
  const priceFilterActive = priceMin > 0 || priceMax < 200

  const activeFilterCount =
    (categoryFilterActive ? 1 : 0) +
    (collectionFilterActive ? 1 : 0) +
    (priceFilterActive ? 1 : 0)

  // Category items for filter
  const categoryItems = categories
    .filter(cat => !categoryId || cat.id !== categoryId)
    .map(cat => ({
      value: cat.id,
      label: cat.name,
      count: cat.products?.length
    }))

  // Collection items for filter
  const collectionItems = collections.map(coll => ({
    value: coll.id!,
    label: coll.title,
    count: coll.products?.length
  }))

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Sort */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </div>

      {/* Brands/Collections */}
      {collectionItems.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <FilterCheckboxGroup
            title="Merken"
            items={collectionItems}
            selectedValues={selectedCollections}
            handleChange={handleCollectionChange}
          />
        </div>
      )}

      {/* Price Range */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <PriceRangeSlider
          min={0}
          max={200}
          currentMin={priceMin}
          currentMax={priceMax}
          onChange={handlePriceChange}
          currency={currencySymbol}
        />
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="small:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-white text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Panel */}
      {isMobileFiltersOpen && (
        <div
          className="small:hidden fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gray-50 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-3 w-full text-sm font-medium text-gray-700 hover:text-gray-900 py-2 border border-gray-300 rounded-lg transition-colors"
                >
                  Alle filters wissen ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Filter Content */}
            <div className="p-4">
              <FilterContent />
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Toon resultaten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden small:block w-[280px] flex-shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Wissen ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Filter Content */}
        <FilterContent />
      </div>
    </>
  )
}

export default RefinementList
