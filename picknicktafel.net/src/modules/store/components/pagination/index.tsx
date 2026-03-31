"use client"

import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx(
        "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
        {
          "bg-gray-900 text-white": isCurrent,
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isCurrent,
        }
      )}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="w-10 h-10 flex items-center justify-center text-sm text-gray-400 cursor-default"
    >
      ...
    </span>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  const hasPrev = page > 1
  const hasNext = page < totalPages

  // Render the component
  return (
    <div className="flex justify-center w-full mt-12">
      <div className="flex items-center gap-1 border border-gray-200 rounded-xl bg-white p-1.5" data-testid={dataTestid}>
        {/* Previous Arrow */}
        <button
          className={clx(
            "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200",
            {
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer": hasPrev,
              "text-gray-300 cursor-not-allowed": !hasPrev,
            }
          )}
          disabled={!hasPrev}
          onClick={() => hasPrev && handlePageChange(page - 1)}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Page Numbers */}
        {renderPageButtons()}

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Next Arrow */}
        <button
          className={clx(
            "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200",
            {
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer": hasNext,
              "text-gray-300 cursor-not-allowed": !hasNext,
            }
          )}
          disabled={!hasNext}
          onClick={() => hasNext && handlePageChange(page + 1)}
          aria-label="Next page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
