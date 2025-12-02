"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Parasols: "/collections/markt-parasols",
  Zoeken: "/search",
  Offerte: "/offerte-aanvragen",
  Account: "/account",
  Winkelwagen: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{width: "30px"}}
                  >
                    <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
                  </svg>{" "}
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Markt-Parasol.nl. All
                        rights reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
