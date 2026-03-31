"use client"

import { useComparison } from "@lib/context/comparison-context"
import { Button } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { convertToLocale } from "@lib/util/money"

export default function ComparisonPage() {
  const { comparedProducts, removeFromComparison, clearComparison, comparisonCount } = useComparison()
  const router = useRouter()

  if (comparisonCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24 text-neutral-300 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">No Products to Compare</h2>
        <p className="text-neutral-600 mb-6 text-center">
          Start adding products to compare their features and specifications
        </p>
        <Button
          onClick={() => router.push("/store")}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          Browse Products
        </Button>
      </div>
    )
  }

  const getLowestPrice = (product: any) => {
    if (!product.variants || product.variants.length === 0) return null
    const prices = product.variants
      .map((v: any) => v.calculated_price?.calculated_amount)
      .filter(Boolean)
    return prices.length > 0 ? Math.min(...prices) : null
  }

  return (
    <div className="content-container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight mb-2">
            Product Comparison
          </h1>
          <p className="text-neutral-600">
            Comparing {comparisonCount} {comparisonCount === 1 ? "product" : "products"}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={clearComparison}
            variant="secondary"
            className="border-neutral-300 text-neutral-700 hover:border-gray-400 hover:text-gray-900"
          >
            Clear All
          </Button>
          <Button
            onClick={() => router.back()}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Back to Store
          </Button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-neutral-200 rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-neutral-100 px-6 py-4 text-left text-sm font-bold text-neutral-800 uppercase tracking-wider border-r border-neutral-200"
                  >
                    Feature
                  </th>
                  {comparedProducts.map((product) => (
                    <th
                      key={product.id}
                      scope="col"
                      className="px-6 py-4 text-center min-w-[250px]"
                    >
                      <div className="relative">
                        <button
                          onClick={() => removeFromComparison(product.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                          aria-label={`Remove ${product.title}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {/* Product Image */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Product
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <Link href={`/products/${product.handle}`} className="block group">
                        <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-neutral-100">
                          {product.thumbnail ? (
                            <Image
                              src={product.thumbnail}
                              alt={product.title || "Product"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              No image
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-neutral-800 group-hover:text-gray-900 transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                    </td>
                  ))}
                </tr>

                {/* Price */}
                <tr className="bg-neutral-50/50">
                  <td className="sticky left-0 z-10 bg-neutral-50/50 px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Price
                  </td>
                  {comparedProducts.map((product) => {
                    const lowestPrice = getLowestPrice(product)
                    return (
                      <td key={product.id} className="px-6 py-4 text-center">
                        {lowestPrice ? (
                          <span className="text-lg font-bold text-gray-900">
                            {convertToLocale({
                              amount: lowestPrice,
                              currency_code: product.variants?.[0]?.calculated_price?.currency_code || "usd",
                            })}
                          </span>
                        ) : (
                          <span className="text-neutral-500">N/A</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* Description */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Description
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-sm text-neutral-600 text-left">
                      {product.description || <span className="text-neutral-400 italic">No description</span>}
                    </td>
                  ))}
                </tr>

                {/* Material (if available) */}
                <tr className="bg-neutral-50/50">
                  <td className="sticky left-0 z-10 bg-neutral-50/50 px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Material
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-sm text-neutral-600 text-center">
                      {product.material || <span className="text-neutral-400">—</span>}
                    </td>
                  ))}
                </tr>

                {/* Weight (if available) */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Weight
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-sm text-neutral-600 text-center">
                      {product.weight ? `${product.weight}g` : <span className="text-neutral-400">—</span>}
                    </td>
                  ))}
                </tr>

                {/* Number of Variants */}
                <tr className="bg-neutral-50/50">
                  <td className="sticky left-0 z-10 bg-neutral-50/50 px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Options Available
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-sm text-neutral-600 text-center">
                      {product.variants?.length || 0} {product.variants?.length === 1 ? "option" : "options"}
                    </td>
                  ))}
                </tr>

                {/* Action */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200">
                    Action
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4">
                      <Link href={`/products/${product.handle}`}>
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
