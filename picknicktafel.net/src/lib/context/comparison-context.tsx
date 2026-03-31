"use client"

import { HttpTypes } from "@medusajs/types"
import React, { createContext, useContext, useState, useCallback } from "react"

type ComparisonContextType = {
  comparedProducts: HttpTypes.StoreProduct[]
  addToComparison: (product: HttpTypes.StoreProduct) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  isInComparison: (productId: string) => boolean
  comparisonCount: number
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export const ComparisonProvider = ({ children }: { children: React.ReactNode }) => {
  const [comparedProducts, setComparedProducts] = useState<HttpTypes.StoreProduct[]>([])

  const addToComparison = useCallback((product: HttpTypes.StoreProduct) => {
    setComparedProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev
      }
      if (prev.length >= 4) {
        return prev // Max 4 products
      }
      return [...prev, product]
    })
  }, [])

  const removeFromComparison = useCallback((productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearComparison = useCallback(() => {
    setComparedProducts([])
  }, [])

  const isInComparison = useCallback(
    (productId: string) => {
      return comparedProducts.some((p) => p.id === productId)
    },
    [comparedProducts]
  )

  return (
    <ComparisonContext.Provider
      value={{
        comparedProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        comparisonCount: comparedProducts.length,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider")
  }
  return context
}
