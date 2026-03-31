import { Metadata } from "next"
import ComparisonPage from "@modules/products/templates/comparison-template"

export const metadata: Metadata = {
  title: "Product Comparison",
  description: "Compare products side by side to find the best fit for your needs",
}

export default function Compare() {
  return <ComparisonPage />
}
