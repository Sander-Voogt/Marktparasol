import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight, Home } from "lucide-react"

import ProductActionsWrapper from "./product-actions-wrapper"
import ImageGallery2 from "../components/image-gallery/gallery2"
import { ProductDescription } from "../components/product-preview/rendertiptap"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Get first category for breadcrumb
  const category = product.categories?.[0]

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="content-container max-w-7xl mx-auto py-2 sm:py-3">
            <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-500 overflow-x-auto no-scrollbar">
              <LocalizedClientLink href="/" className="hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
              </LocalizedClientLink>
              <ChevronRight className="w-4 h-4" />
              <LocalizedClientLink href="/store" className="hover:text-primary transition-colors">
                Producten
              </LocalizedClientLink>
              {category && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="hover:text-primary transition-colors"
                  >
                    {category.name}
                  </LocalizedClientLink>
                </>
              )}
              <ChevronRight className="w-4 h-4" />
              <span className="text-neutral-800 font-medium truncate max-w-[120px] sm:max-w-[200px]">
                {product.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="content-container max-w-7xl mx-auto py-4 sm:py-6 lg:py-8" data-testid="product-container">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="bg-gray-50 p-4 sm:p-6 lg:p-10">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <ImageGallery images={images} />
                  </div>

                  {/* Additional Product Description */}
                  {product?.metadata?.maindescription?.html && (
                    <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100">
                      <ProductDescription
                        content={product?.metadata?.maindescription?.html}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="flex flex-col p-4 sm:p-6 lg:p-10 gap-y-4 sm:gap-y-6">
                {/* Product Info */}
                <ProductInfo product={product} />

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Product Actions (Price, Quantity, Add to Cart) */}
                <div className="flex flex-col gap-y-4">
                  <ProductOnboardingCta />
                  <Suspense
                    fallback={
                      <ProductActions
                        disabled={true}
                        product={product}
                        region={region}
                      />
                    }
                  >
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Product Tabs (Specs, Shipping, Returns) */}
                <ProductTabs product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div
          className="content-container max-w-7xl mx-auto py-8 sm:py-10 lg:py-12"
          data-testid="related-products-container"
        >
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
