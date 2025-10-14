import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-mode="light">
      <GoogleTagManager gtmId="GTM-W3XXPBL3" gtmScriptUrl="https://preview-production-91d9.up.railway.app"/>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
