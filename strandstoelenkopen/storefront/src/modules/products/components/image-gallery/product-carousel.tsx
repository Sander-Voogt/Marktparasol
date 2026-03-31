"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProductCarouselProps = {
  images: HttpTypes.StoreProductImage[]
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Track selected slide
  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect).on("reInit", onSelect)
  }, [emblaApi, onSelect])

  // Auto-play functionality - transition every 5 seconds
  useEffect(() => {
    if (!emblaApi || images.length <= 1) return

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => clearInterval(autoplay)
  }, [emblaApi, images.length])

  // If there's only one image, render without carousel controls
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50 flex items-center justify-center rounded">
        {images[0]?.url && (
          <Image
            src={images[0].url}
            alt="Product image"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="rounded"
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative w-full${
        images.length > 1 && images.length <= 5 ? " pb-8" : ""
      }`}
    >
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="flex-none w-full aspect-square relative bg-gray-50"
              style={{ minWidth: 0 }}
            >
              {image.url && (
                <Image
                  src={image.url}
                  priority={index === 0}
                  className="rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Inside main carousel container */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm border border-gray-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm border border-gray-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Slide Indicators - Now inside the main carousel container */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-8 h-2 bg-gray-900 shadow-lg"
                      : "w-2 h-2 bg-gray-400 hover:bg-gray-700"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : "false"}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Navigation - Now properly separated with more spacing */}
      {images.length > 1 && images.length <= 5 && (
        <div className="flex gap-3 mt-6 justify-center">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => scrollTo(index)}
              className={`relative w-20 h-20 rounded overflow-hidden transition-all duration-300 ${
                index === selectedIndex
                  ? "ring-2 ring-gray-900 shadow-lg scale-105"
                  : "ring-1 ring-gray-300 hover:ring-gray-400 opacity-70 hover:opacity-100"
              }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCarousel
