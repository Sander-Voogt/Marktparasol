"use client"

import { useState, useEffect, useCallback } from "react"

type PriceRangeSliderProps = {
  min: number
  max: number
  currentMin: number
  currentMax: number
  onChange: (min: number, max: number) => void
  currency?: string
  "data-testid"?: string
}

const PriceRangeSlider = ({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
  currency = "€",
  "data-testid": dataTestId,
}: PriceRangeSliderProps) => {
  const [minValue, setMinValue] = useState(currentMin)
  const [maxValue, setMaxValue] = useState(currentMax)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setMinValue(currentMin)
    setMaxValue(currentMax)
  }, [currentMin, currentMax])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1)
    setMinValue(value)
    setIsDragging(true)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1)
    setMaxValue(value)
    setIsDragging(true)
  }

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      onChange(minValue, maxValue)
      setIsDragging(false)
    }
  }, [isDragging, minValue, maxValue, onChange])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchend", handleMouseUp)
      return () => {
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchend", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseUp])

  const minPercent = ((minValue - min) / (max - min)) * 100
  const maxPercent = ((maxValue - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-4" data-testid={dataTestId}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-800">Prijs</span>
        <button
          onClick={() => onChange(min, max)}
          className="text-xs text-gray-700 hover:text-gray-900 font-medium"
        >
          Reset
        </button>
      </div>

      {/* Price Display */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-center">
          <span className="text-xs text-neutral-500 block">Min</span>
          <span className="text-sm font-bold text-neutral-800">{currency}{minValue}</span>
        </div>
        <div className="text-neutral-300">—</div>
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-center">
          <span className="text-xs text-neutral-500 block">Max</span>
          <span className="text-sm font-bold text-neutral-800">{currency}{maxValue}</span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative h-6 mt-4 mb-2 flex items-center">
        {/* Background Track */}
        <div className="absolute w-full h-3 bg-gray-300 rounded-full shadow-inner"></div>

        {/* Active Range Track */}
        <div
          className="absolute h-3 bg-gradient-to-r from-gray-900 to-gray-900 rounded-full shadow-sm"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Min Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:bg-gray-800 [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: minValue > max - 100 ? 5 : 3 }}
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:bg-gray-800 [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  )
}

export default PriceRangeSlider
