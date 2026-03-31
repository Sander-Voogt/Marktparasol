"use client"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types/dist/bundles"
import { Text } from "@medusajs/ui"
import QuantitySelector from "@modules/search/components/hit/QuantitySelector"
import { useEffect, useState } from "react"

export default function PreviewPrice({ price, product }) {
  const [canSeePrices, setCanSeePrices] = useState(false)

  useEffect(() => {
    fetch("/api/active-client?group=cusgroup_01KEKMNE98JN0RXSRB3YZCS359").then(
      (res: any) =>
        res.json().then((res: any) => {
          console.log(res)
          if (res.authenticated == false) {
            setCanSeePrices(false)
          } else if (res?.customer?.exists_in_group) {
            setCanSeePrices(true)
          }
        })
    )
  }, [])

  const isVariantInStock = (variant: HttpTypes.StoreProductVariant) => {
    return (
      variant.manage_inventory === false ||
      (variant.inventory_quantity || 0) > 0
    )
  }

  if (!canSeePrices) {
    return <Text>Log in om prijzen te zien</Text>
  }

  console.log("product in showprice", product.variants?.[0])

  return (
    <>
      <div>{price}</div>
      {isVariantInStock(product?.variants?.[0] || {}) ? (
        <QuantitySelector
          variantId={product?.variants?.[0]?.id || ""}
          countryCode="nl"
        />
      ) : (
        "uitverkocht"
      )}
    </>
  )
}
