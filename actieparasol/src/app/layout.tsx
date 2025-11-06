import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { GoogleTagManager } from "@next/third-parties/google"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <GoogleTagManager
        gtmId="GTM-N76LT4GL"
      />

      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
