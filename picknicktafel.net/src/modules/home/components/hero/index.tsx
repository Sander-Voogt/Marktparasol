import { HttpTypes } from "@medusajs/types"
import HeroCarousel from "./HeroCarousel"

type HeroProps = {
  categories?: HttpTypes.StoreProductCategory[]
}

const Hero = ({ categories }: HeroProps) => {
  return <HeroCarousel categories={categories} />
}

export default Hero
