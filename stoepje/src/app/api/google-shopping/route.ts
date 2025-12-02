import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

// Definieer een type voor een product
interface Product {
    id: string
    title: string
    description: string
    link: string
    image_link: string
    price: string
    brand: string
    availability: "in_stock" | "out_of_stock" | "preorder"
    condition: "new" | "used" | "refurbished"
    gtin?: string
    mpn?: string
    google_product_category?: string
}

export const formatPrice = (amount: number, currency?: string): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "usd",
    })
        .format(amount)

}

// Simuleer productgegevens (in een echte app haal je deze uit een database)
const getProducts = async (): Promise<Product[]> => {
    let next = 0
    const recordlist: Product[] = []
    while (next !== null) {
        const { response, nextPage } = await getProductsList({
            pageParam: next,
            countryCode: "nl",
        })

        response.products.map((product) => {
            const selectedVariantPrice =
                product?.variants?.sort(
                    (
                        a: HttpTypes.StoreProductVariant,
                        b: HttpTypes.StoreProductVariant
                    ) => {
                        if (
                            !a.calculated_price?.calculated_amount &&
                            !b.calculated_price?.calculated_amount
                        ) {
                            return 0
                        }

                        if (!a.calculated_price?.calculated_amount) {
                            return 1
                        }

                        if (!b.calculated_price?.calculated_amount) {
                            return -1
                        }

                        return (
                            a.calculated_price?.calculated_amount -
                            b.calculated_price?.calculated_amount
                        )
                    }
                )[0]

            console.log(selectedVariantPrice);

            return (
                recordlist.push({
                    id: product.id,
                    title: product.title,
                    description: product.description ?? "",
                    link: "https://markt-parasol.nl/products/" + product.handle,
                    image_link: product?.images?.[0]?.url ?? 'Geen afbeelding beschikbaar',
                    price: formatPrice(
                        selectedVariantPrice?.calculated_price?.calculated_amount || 0,
                        'eur'
                    ),
                    brand: "Markt-Parasol.nl",
                    availability: "in_stock",
                    condition: "new",
                    // gtin: "0123456789012",
                    google_product_category: "235920",
                })
            )

        }

        )

        if (nextPage != null) {
            next = nextPage
        } else {
            // @ts-ignore
            next = null
        }
    }

    return recordlist
}

export async function GET(req: NextRequest) {
    const products = await getProducts()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
    <channel>
      <title>Markt-Parasol.nl</title>
      <link>https://markt-parasol.nl</link>
      <description>Productfeed voor Google Shopping</description>
      ${products
            .map(
                (product) => `
        <item>
          <g:id>${product.id}</g:id>
          <title><![CDATA[${product.title}]]></title>
          <description><![CDATA[${product.description}]]></description>
          <link>${product.link}</link>
          <g:image_link>${product.image_link}</g:image_link>
          <g:price>${product.price}</g:price>
          <g:brand><![CDATA[${product.brand}]]></g:brand>
          <g:availability>${product.availability}</g:availability>
          <g:condition>${product.condition}</g:condition>
          ${product.gtin ? `<g:gtin>${product.gtin}</g:gtin>` : ""}
          ${product.mpn ? `<g:mpn>${product.mpn}</g:mpn>` : ""}
          ${product.google_product_category
                        ? `<g:google_product_category>${product.google_product_category}</g:google_product_category>`
                        : ""
                    }
        </item>
      `
            )
            .join("")}
    </channel>
  </rss>`

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    })
}
