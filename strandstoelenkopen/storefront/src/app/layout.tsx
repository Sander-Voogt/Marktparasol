import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { ComparisonProvider } from "@lib/context/comparison-context"
import ComparisonBar from "@modules/products/components/comparison-bar"
import AgeGate from "@modules/common/components/age-check"
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <GoogleAnalytics gaId="G-3B3Q9V5RK3" />
      <body>
        <ComparisonProvider>
          <AgeGate />
          <main className="relative">{props.children}</main>
          <ComparisonBar />
        </ComparisonProvider>
      </body>
    </html>
  )
}
