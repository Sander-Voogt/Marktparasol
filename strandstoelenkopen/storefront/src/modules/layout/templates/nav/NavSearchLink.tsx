"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { XMarkMini } from "@medusajs/icons"
import { useEffect, useRef, useState } from "react"

export default function NavSearchLink({
  children,
  hideOnly = false,
}: {
  children: React.ReactNode
  hideOnly?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSearchPage = pathname?.includes("/search")
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(searchParams.get("q") || "")

  useEffect(() => {
    if (isSearchPage) {
      setValue(searchParams.get("q") || "")
    }
  }, [searchParams, isSearchPage])

  useEffect(() => {
    if (isSearchPage && !hideOnly && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchPage, hideOnly])

  if (!isSearchPage) {
    return <>{children}</>
  }

  // Mobile icon: just hide on search page
  if (hideOnly) {
    return null
  }

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
    <div className="hidden md:flex flex-1 justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[360px] lg:max-w-[420px] flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2"
      >
        <SearchIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="Zoek producten..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => updateQuery("")}
            className="p-0.5 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Reset search"
          >
            <XMarkMini className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  )
}
