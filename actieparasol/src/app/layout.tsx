import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
            <GoogleTagManager gtmId="GTM-W3XXPBL3" gtmScriptUrl="https://server-side-tracking-production-c7d9.up.railway.app/gtm.js" />
      
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
