"use client"

import { useComparison } from "@lib/context/comparison-context"
import { Button } from "@medusajs/ui"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ComparisonBar() {
  const { comparedProducts, comparisonCount, clearComparison } = useComparison()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(comparisonCount > 0)
  }, [comparisonCount])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg shadow-2xl p-4 min-w-[320px]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-bold text-sm">
              {comparisonCount}
            </div>
            <span className="font-semibold text-neutral-800">
              {comparisonCount === 1 ? "Product Selected" : "Products Selected"}
            </span>
          </div>
          <button
            onClick={clearComparison}
            className="text-neutral-500 hover:text-gray-900 transition-colors"
            aria-label="Clear comparison"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {comparedProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center gap-2 text-sm text-neutral-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-gray-700 flex-shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="truncate">{product.title}</span>
            </div>
          ))}
          {comparisonCount > 3 && (
            <div className="text-sm text-neutral-500 pl-6">
              +{comparisonCount - 3} more
            </div>
          )}
        </div>

        <Link href="/compare" className="block">
          <Button
            className="w-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-opacity"
          >
            Compare Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
        </Link>

        {comparisonCount < 4 && (
          <p className="text-xs text-neutral-500 text-center mt-2">
            Add up to {4 - comparisonCount} more products
          </p>
        )}
      </div>
    </div>
  )
}
