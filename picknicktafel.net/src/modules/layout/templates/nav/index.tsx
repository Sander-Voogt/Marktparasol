import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import CheckActiveClient from "./CheckActiveClient"
import NavSearchLink from "./NavSearchLink"
import { SearchIcon, UserIcon } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const categories = await listCategories()

  const topLevelCategories =
    categories?.filter(
      (cat) =>
        !cat.parent_category_id &&
        cat.handle?.toLowerCase() !== "pants" &&
        !cat.name?.toLowerCase().includes("pants")
    ) || []

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <CheckActiveClient />

      <header className="relative h-16 sm:h-20 mx-auto border-b border-gray-200 shadow-sm duration-200 bg-white">
        <nav className="content-container flex items-center justify-between w-full h-full px-4 sm:px-6 lg:px-8">
          {/* LEFT – hamburger + desktop logo */}
          <div className="flex items-center gap-2 lg:gap-4">
            <SideMenu regions={regions} categories={topLevelCategories} />

            <LocalizedClientLink
              href="/"
              className="hidden md:flex items-center gap-3 hover:opacity-90 transition-opacity"
              data-testid="nav-store-link"
            >
              <div className="relative w-28 lg:w-36 overflow-hidden">
                <Image
                  src="https://user.fm/files/v2-440e0bb07a929e996c6a98fbc0257f71/RIC-HOLLAND.svg"
                  alt="Ric Holland"
                  width={200}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </LocalizedClientLink>
          </div>

          {/* CENTER – mobile logo / desktop search */}
          <div className="flex-1 flex justify-center">
            {/* Mobile logo */}
            <LocalizedClientLink
              href="/"
              className="md:hidden flex items-center hover:opacity-90 transition-opacity"
              data-testid="nav-store-link-mobile"
            >
              <div className="relative w-28 overflow-hidden">
                <Image
                  src="https://user.fm/files/v2-440e0bb07a929e996c6a98fbc0257f71/RIC-HOLLAND.svg"
                  alt="Ric Holland"
                  width={200}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </LocalizedClientLink>

            {/* Desktop search */}
            <NavSearchLink>
              <div className="hidden md:flex flex-1 justify-center px-4">
                <LocalizedClientLink
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                  className="w-full max-w-[360px] lg:max-w-[420px]"
                >
                  <button
                    className="w-full flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50
                               px-4 py-2
                               hover:bg-gray-100 hover:border-gray-300 transition-all
                               text-gray-400 text-sm"
                  >
                    <SearchIcon className="w-4 h-4" />
                    <span className="truncate">Zoeken...</span>

                    <kbd className="ml-auto hidden sm:inline-flex items-center gap-0.5 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] text-gray-400">
                      ⌘K
                    </kbd>
                  </button>
                </LocalizedClientLink>
              </div>
            </NavSearchLink>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-x-3 sm:gap-x-6">
            <div className="flex md:hidden items-center">
              <NavSearchLink hideOnly>
                <LocalizedClientLink
                  className="p-2 rounded hover:bg-gray-100"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link-mobile"
                >
                  <SearchIcon className="w-6 h-6 text-gray-700" />
                </LocalizedClientLink>
              </NavSearchLink>
            </div>

            <LocalizedClientLink
              className="flex items-center gap-1.5 p-2 rounded hover:bg-gray-100 text-gray-700"
              href="/account"
              data-testid="nav-account-link"
            >
              <UserIcon className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">Account</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-sm lg:text-base font-medium text-neutral-700 hover:text-gray-900 flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <span className="hidden sm:inline">Winkelwagen (0)</span>
                  <span className="sm:hidden">🛒</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>

      {/* Category bar blijft ongewijzigd */}
      <div className="bg-white text-gray-800 border-b border-gray-200 shadow-sm relative">
        <div className="content-container overflow-visible">
          <nav className="flex items-center justify-start sm:justify-center gap-x-1 sm:gap-x-2 py-2 sm:py-3 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
            <LocalizedClientLink
              href="/store"
              className="px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-gray-50 rounded-lg"
            >
              Alle Producten
            </LocalizedClientLink>

            {topLevelCategories.map((category) => (
              <div key={category.id} className="relative group/cat">
                <LocalizedClientLink
                  href={`/categories/${category.handle}`}
                  className="px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-gray-50 rounded-lg flex items-center gap-1"
                >
                  {category.name}
                  {/* {category.category_children?.length > 0 && (
                    <svg
                      className="w-3 h-3 transition-transform group-hover/cat:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )} */}
                </LocalizedClientLink>

                {/* {category.category_children?.length > 0 && (
                  <div className="hidden group-hover/cat:block absolute top-full left-0 pt-1 z-50">
                    <div className="min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      {category.category_children.map((child) => (
                        <LocalizedClientLink
                          key={child.id}
                          href={`/categories/${child.handle}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {child.name}
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
