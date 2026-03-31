import React from 'react'
import Image from 'next/image'
import { HttpTypes } from '@medusajs/types'

type ThumbProps = {
  selected: boolean
  index: HttpTypes.StoreProductImage
  onClick: () => void
}

export const Thumb: React.FC<ThumbProps> = ({ selected, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`embla-thumbs__slide relative aspect-square w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
        selected
          ? 'ring-4 ring-blue-500 ring-offset-2 opacity-100 scale-110 shadow-xl'
          : 'opacity-50 hover:opacity-100 hover:scale-105 shadow-md'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
      <Image
        src={index.url}
        alt="Product thumbnail"
        fill
        className="object-cover relative z-10 p-1"
        sizes="80px"
      />
    </button>
  )
}
