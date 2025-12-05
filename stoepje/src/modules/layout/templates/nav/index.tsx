import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-28 mx-auto border-b duration-200 bg-slate-950 border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-white text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-white uppercase"
              data-testid="nav-store-link"
            >
              <img src="/img/stoepje.png" width={150} height={50}/> 
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden text-lg small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-white"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Zoeken
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-white"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
               <LocalizedClientLink
                className="hover:text-white"
                href="/offerte-aanvragen"
                data-testid="nav-account-link"
              >
                Offerte aanvragen
              </LocalizedClientLink>
                             <LocalizedClientLink
                className="hover:text-white"
                href="/contact"
                data-testid="nav-account-link"
              >
                Contact
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-white flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <span className="text-lg">Winkelwagen (0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
