"use client"

import { HttpTypes } from "@medusajs/types"
import ComparisonToggle from "@modules/products/components/product-actions/comparison-toggle"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductActions({ product }: ProductActionsProps) {
  return (
    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {/* <ComparisonToggle product={product} /> */}
    </div>
  )
}
