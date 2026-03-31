"use client"

import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useComparison } from "@lib/context/comparison-context"

type ComparisonToggleProps = {
  product: HttpTypes.StoreProduct
}

export default function ComparisonToggle({ product }: ComparisonToggleProps) {
  const { addToComparison, removeFromComparison, isInComparison, comparisonCount } = useComparison()
  const isComparing = isInComparison(product.id)

  const handleToggle = () => {
    if (isComparing) {
      removeFromComparison(product.id)
    } else {
      if (comparisonCount >= 4) {
        alert("You can compare up to 4 products at a time")
        return
      }
      addToComparison(product)
    }
  }

  return (
    <Button
      onClick={handleToggle}
      variant="secondary"
      className={`
        w-full border transition-all duration-200
        ${
          isComparing
            ? "border-gray-900 bg-gray-100 text-gray-900 hover:bg-gray-200"
            : "border-neutral-300 bg-white text-neutral-700 hover:border-gray-400 hover:text-gray-900"
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
      {isComparing ? "Remove from Compare" : "Compare"}
    </Button>
  )
}
