"use client"

import { clx } from "@medusajs/ui"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  collapsible?: boolean
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  collapsible = true,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold text-neutral-800"
        >
          {title}
          {collapsible && (
            <ChevronDown
              className={clx("w-4 h-4 text-neutral-400 transition-transform", {
                "rotate-180": isExpanded,
              })}
            />
          )}
        </button>
      </div>

      {/* Items */}
      {isExpanded && (
        <div className="flex flex-col gap-1" data-testid={dataTestId}>
          {items?.map((item) => {
            const isSelected = item.value === value
            return (
              <button
                key={item.value}
                onClick={() => handleChange(item.value)}
                className={clx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                  {
                    "bg-gray-50 border border-gray-300": isSelected,
                    "bg-gray-50 border border-transparent hover:bg-gray-50": !isSelected,
                  }
                )}
              >
                {/* Custom Radio */}
                <div
                  className={clx(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    {
                      "bg-gray-900": isSelected,
                      "bg-white border-2 border-gray-300": !isSelected,
                    }
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={clx("text-sm flex-1", {
                    "text-gray-900 font-medium": isSelected,
                    "text-neutral-700": !isSelected,
                  })}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FilterRadioGroup
