"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Winkel: "/store",
  Account: "/account",
  Winkelwagen: "/cart",
}

const CategoryItem = ({ category, close }: { category: any; close: () => void }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = category.category_children?.length > 0

  if (!hasChildren) {
    return (
      <li className="w-full">
        <LocalizedClientLink
          href={`/categories/${category.handle}`}
          className="block text-base sm:text-lg font-medium text-neutral-600 hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-2 transform transition-all duration-200"
          onClick={close}
        >
          {category.name}
        </LocalizedClientLink>
      </li>
    )
  }

  return (
    <li className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-base sm:text-lg font-medium text-neutral-600 hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-2 transform transition-all duration-200"
      >
        {category.name}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <ul className="flex flex-col gap-1 pl-4 mt-1">
          <li className="w-full">
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className="block text-sm sm:text-base font-medium text-neutral-500 hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-2 transform transition-all duration-200"
              onClick={close}
            >
              Alle {category.name}
            </LocalizedClientLink>
          </li>
          {category.category_children.map((child: any) => (
            <CategoryItem key={child.id} category={child} close={close} />
          ))}
        </ul>
      )}
    </li>
  )
}

const SideMenu = ({ regions, categories }: { regions: HttpTypes.StoreRegion[] | null; categories?: any[] }) => {
  const toggleState = useToggleState()
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="flex py-2 px-2">
          {({ open, close }) => (
            <>
              <div className="relative flex">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg focus:outline-none text-neutral-700 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="hidden sm:inline">Menu</span>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/30 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 -translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-full"
              >
                <PopoverPanel className="flex flex-col fixed left-0 top-0 w-[85vw] sm:w-[380px] lg:w-[420px] h-screen z-[51] text-sm shadow-2xl transform">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white justify-between overflow-y-auto"
                  >
                    {/* Header with black accent */}
                    <div className="flex justify-between items-center p-6 bg-gray-900 text-white">
                      <h2 className="text-2xl font-bold">Menu</h2>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                      >
                        <XMark className="w-6 h-6" />
                      </button>
                    </div>
                    {/* Menu items */}
                    <ul className="flex flex-col gap-1 items-start justify-start p-6 flex-1">
                      {/* Home */}
                      <li className="w-full">
                        <LocalizedClientLink
                          href="/"
                          className="block text-xl sm:text-2xl font-semibold text-neutral-800 leading-relaxed hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-3 transform transition-all duration-200"
                          onClick={close}
                          data-testid="home-link"
                        >
                          Home
                        </LocalizedClientLink>
                      </li>
                      {/* Producten with submenu */}
                      <li className="w-full">
                        <button
                          onClick={() => setProductsOpen(!productsOpen)}
                          className="flex items-center justify-between w-full text-xl sm:text-2xl font-semibold text-neutral-800 leading-relaxed hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-3 transform transition-all duration-200"
                        >
                          Producten
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                        {productsOpen && categories && categories.length > 0 && (
                          <ul className="flex flex-col gap-1 pl-4 mt-1">
                            <li className="w-full">
                              <LocalizedClientLink
                                href="/store"
                                className="block text-base sm:text-lg font-medium text-neutral-600 hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-2 transform transition-all duration-200"
                                onClick={close}
                              >
                                Alle Producten
                              </LocalizedClientLink>
                            </li>
                            {categories.map((category) => (
                              <CategoryItem key={category.id} category={category} close={close} />
                            ))}
                          </ul>
                        )}
                      </li>
                      {/* Remaining items (skip Home and Winkel since we handle them above) */}
                      {Object.entries(SideMenuItems)
                        .filter(([name]) => name !== "Home" && name !== "Winkel")
                        .map(([name, href]) => (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="block text-xl sm:text-2xl font-semibold text-neutral-800 leading-relaxed hover:text-gray-900 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-4 py-3 transform transition-all duration-200"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                    </ul>
                    {/* Footer */}
                    <div className="flex flex-col gap-y-6 p-6 border-t border-gray-100 bg-gray-50">
                      <Text className="text-xs text-neutral-500 text-center">
                        © {new Date().getFullYear()} Ric Holland. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
