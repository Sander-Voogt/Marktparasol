"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { MagnifyingGlassMini } from "@medusajs/icons"
import { XMarkMini } from "@medusajs/icons"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchSync from "./SearchSync"
import { ToastContainer } from "react-toastify"
import { useEffect, useRef, useState } from "react"

export default function SearchModal() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [value, setValue] = useState(query)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(searchParams.get("q") || "")
  }, [searchParams])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const updateQuery = (q: string) => {
    setValue(q)
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value) {
      router.push(`/results/${value}`)
    }
  }

  return (
    <div className="content-container py-6">
      <InstantSearch
        indexName={SEARCH_INDEX_NAME}
        searchClient={searchClient}
      >
        <SearchSync query={query} />
        <div className="flex flex-col w-full" data-testid="search-modal-container">
          {/* Mobile search bar */}
          <div className="md:hidden w-full flex items-center gap-x-2 px-3 py-2.5 bg-white rounded-xl shadow-lg mb-4">
            <MagnifyingGlassMini className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
              <input
                ref={inputRef}
                type="search"
                value={value}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder="Zoek producten..."
                autoComplete="off"
                autoCorrect="off"
                style={{fontSize: '16px'}}
                autoCapitalize="off"
                spellCheck={false}
                className="flex-1 h-9 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Reset search"
                >
                  <XMarkMini className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
      <ToastContainer
        newestOnTop={true}
        closeButton={false}
        limit={3}
        rtl={false}
      />
    </div>
  )
}
