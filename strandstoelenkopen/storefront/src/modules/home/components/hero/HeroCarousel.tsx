'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Truck, Tag, Gift, Clock } from 'lucide-react'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { HttpTypes } from '@medusajs/types'
import Image from 'next/image'

const promoSlides = [
  {
    id: 1,
    title: 'Gratis Verzending',
    subtitle: 'Bij bestellingen boven €299',
    icon: Truck,
  },
  {
    id: 2,
    title: 'Beste Prijzen',
    subtitle: 'Altijd scherp geprijsd',
    icon: Tag,
  },
  {
    id: 3,
    title: 'Snelle Levering',
    subtitle: 'Voor 12:00 besteld, zelfde dag verzonden',
    icon: Clock,
  }
]

type HeroCarouselProps = {
  categories?: HttpTypes.StoreProductCategory[]
}

const HeroCarousel = ({ categories }: HeroCarouselProps) => {
  const [promoIndex, setPromoIndex] = useState(0)
  const [categoryIndex, setCategoryIndex] = useState(0)

  const [promoRef, promoApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  })

  const [categoryRef, categoryApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 2,
  })

  // Filter top-level categories that have products, exclude "Pants"
  const topCategories = categories?.filter((cat) =>
    !cat.parent_category &&
    cat.handle?.toLowerCase() !== 'pants' &&
    !cat.name?.toLowerCase().includes('pants')
  ) || []

  const scrollCategoryPrev = useCallback(() => {
    if (categoryApi) categoryApi.scrollPrev()
  }, [categoryApi])

  const scrollCategoryNext = useCallback(() => {
    if (categoryApi) categoryApi.scrollNext()
  }, [categoryApi])

  const onPromoSelect = useCallback(() => {
    if (!promoApi) return
    setPromoIndex(promoApi.selectedScrollSnap())
  }, [promoApi])

  const onCategorySelect = useCallback(() => {
    if (!categoryApi) return
    setCategoryIndex(categoryApi.selectedScrollSnap())
  }, [categoryApi])

  useEffect(() => {
    if (!promoApi) return
    onPromoSelect()
    promoApi.on('select', onPromoSelect).on('reInit', onPromoSelect)
    return () => {
      promoApi.off('select', onPromoSelect).off('reInit', onPromoSelect)
    }
  }, [promoApi, onPromoSelect])

  useEffect(() => {
    if (!categoryApi) return
    onCategorySelect()
    categoryApi.on('select', onCategorySelect).on('reInit', onCategorySelect)
    return () => {
      categoryApi.off('select', onCategorySelect).off('reInit', onCategorySelect)
    }
  }, [categoryApi, onCategorySelect])

  // Auto-play for promo
  useEffect(() => {
    if (!promoApi) return
    const autoplay = setInterval(() => {
      promoApi.scrollNext()
    }, 4000)
    return () => clearInterval(autoplay)
  }, [promoApi])

  return (
    <div className="w-full">
      {/* Promo Banner - Compact */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="content-container py-3 sm:py-4">
          {/* Desktop: Show all benefits in a row */}
          <div className="hidden md:grid md:grid-cols-4 gap-3">
            {promoSlides.map((slide) => {
              const Icon = slide.icon
              return (
                <div
                  key={slide.id}
                  className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-800 text-xs">{slide.title}</h3>
                    <p className="text-[10px] text-neutral-500 truncate">{slide.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden" ref={promoRef}>
              <div className="flex">
                {promoSlides.map((slide) => {
                  const Icon = slide.icon
                  return (
                    <div key={slide.id} className="flex-none w-full px-1">
                      <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-800 text-xs">{slide.title}</h3>
                          <p className="text-[10px] text-neutral-500">{slide.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-2">
              {promoSlides.map((_, index) => (
                <button
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === promoIndex ? 'w-4 h-1 bg-gray-900' : 'w-1 h-1 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Slider with Images */}
      {topCategories.length > 0 && (
        <div className="bg-white border-b border-gray-100">
          <div className="content-container py-5 sm:py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                Shop per Categorie
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollCategoryPrev}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollCategoryNext}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Carousel with Product Images */}
            <div className="overflow-hidden" ref={categoryRef}>
              <div className="flex gap-3">
                {topCategories.map((category) => {
                  // Get first product thumbnail from category
                  const firstProduct = category.products?.[0]
                  const thumbnail = firstProduct?.thumbnail

                  return (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className="flex-none w-[240px] sm:w-[300px] group"
                    >
                      <div className="rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 group-hover:shadow-lg">
                        {/* Image */}
                        <div className="relative aspect-[3/2] bg-gray-100 overflow-hidden">
                          {thumbnail ? (
                            <Image
                              src={thumbnail}
                              alt={category.name || 'Category'}
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
                              {category.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </LocalizedClientLink>
                  )
                })}
                {/* View All Card */}
                <LocalizedClientLink
                  href="/store"
                  className="flex-none w-[120px] sm:w-[150px] group"
                >
                  <div className="rounded-xl overflow-hidden border border-gray-900 bg-gray-900 hover:bg-gray-800 transition-all duration-300 h-full">
                    <div className="aspect-square flex flex-col items-center justify-center p-4">
                      <span className="text-3xl sm:text-4xl mb-2"></span>
                      <h3 className="font-semibold text-white text-sm text-center">
                        Alle Producten
                      </h3>
                      <p className="text-xs text-white/70 mt-1">Bekijk alles</p>
                    </div>
                  </div>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroCarousel
