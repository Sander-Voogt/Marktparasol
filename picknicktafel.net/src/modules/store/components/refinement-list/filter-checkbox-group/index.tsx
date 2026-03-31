"use client"

import { clx } from "@medusajs/ui"
import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

type FilterCheckboxGroupProps = {
  title: string
  items: {
    value: string
    label: string
    count?: number
  }[]
  selectedValues: string[]
  handleChange: (values: string[]) => void
  collapsible?: boolean
  "data-testid"?: string
}

const FilterCheckboxGroup = ({
  title,
  items,
  selectedValues,
  handleChange,
  collapsible = true,
  "data-testid": dataTestId,
}: FilterCheckboxGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleItem = (value: string) => {
    if (selectedValues.includes(value)) {
      handleChange(selectedValues.filter((v) => v !== value))
    } else {
      handleChange([...selectedValues, value])
    }
  }

  const selectAll = () => {
    handleChange(items.map(item => item.value))
  }

  const clearAll = () => {
    handleChange([])
  }

  const allSelected = selectedValues.length === items.length
  const someSelected = selectedValues.length > 0 && selectedValues.length < items.length

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
        {isExpanded && items.length > 1 && (
          <button
            onClick={allSelected ? clearAll : selectAll}
            className="text-xs text-gray-700 hover:text-gray-900 font-medium"
          >
            {allSelected ? "Wis alles" : "Selecteer alles"}
          </button>
        )}
      </div>

      {/* Items */}
      {isExpanded && (
        <div className="flex flex-col gap-1" data-testid={dataTestId}>
          {items.map((item) => {
            const isSelected = selectedValues.includes(item.value)
            return (
              <button
                key={item.value}
                onClick={() => toggleItem(item.value)}
                className={clx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                  {
                    "bg-gray-50 border border-gray-300": isSelected,
                    "bg-gray-50 border border-transparent hover:bg-gray-50": !isSelected,
                  }
                )}
              >
                {/* Custom Checkbox */}
                <div
                  className={clx(
                    "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors",
                    {
                      "bg-gray-900 text-white": isSelected,
                      "bg-white border-2 border-gray-300": !isSelected,
                    }
                  )}
                >
                  {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
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

                {/* Count Badge */}
                {item.count !== undefined && (
                  <span
                    className={clx("text-xs px-2 py-0.5 rounded-full", {
                      "bg-gray-900 text-white": isSelected,
                      "bg-gray-200 text-gray-600": !isSelected,
                    })}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FilterCheckboxGroup
