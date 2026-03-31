import { HttpTypes } from "@medusajs/types"
import ProductCarousel from "./product-carousel"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start w-full bg-neutral-cream">
      <div className="w-full">
      <ProductCarousel images={images} />
      </div>
    </div>
  )
}

export default ImageGallery
