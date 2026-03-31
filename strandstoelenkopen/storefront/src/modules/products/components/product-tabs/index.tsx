"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import {
  ChevronDown,
  Package,
  Truck,
  RotateCcw,
  Shield,
  Scale,
  Ruler,
  Globe,
  Layers,
  Info,
  Clock,
  CheckCircle2
} from "lucide-react"
import { clx } from "@medusajs/ui"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [openTab, setOpenTab] = useState<string | null>("specifications")

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab)
  }

  // Check if product has any specifications
  const hasSpecs = product.material || product.weight || product.origin_country ||
                   product.type || (product.length && product.width && product.height)

  return (
    <div className="w-full flex flex-col gap-y-3">
      {/* Product Specifications Accordion */}
      {hasSpecs && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleTab("specifications")}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Info className="w-5 h-5 text-gray-700" />
              </div>
              <span className="font-semibold text-neutral-800">Product Specificaties</span>
            </div>
            <ChevronDown
              className={clx("w-5 h-5 text-neutral-400 transition-transform", {
                "rotate-180": openTab === "specifications"
              })}
            />
          </button>

          {openTab === "specifications" && (
            <div className="p-4 pt-0 bg-white">
              <div className="grid grid-cols-2 gap-3">
                {product.material && (
                  <SpecItem
                    icon={<Layers className="w-4 h-4" />}
                    label="Materiaal"
                    value={product.material}
                  />
                )}
                {product.weight && (
                  <SpecItem
                    icon={<Scale className="w-4 h-4" />}
                    label="Gewicht"
                    value={`${product.weight} g`}
                  />
                )}
                {product.origin_country && (
                  <SpecItem
                    icon={<Globe className="w-4 h-4" />}
                    label="Herkomst"
                    value={product.origin_country}
                  />
                )}
                {product.type && (
                  <SpecItem
                    icon={<Package className="w-4 h-4" />}
                    label="Type"
                    value={product.type.value}
                  />
                )}
                {product.length && product.width && product.height && (
                  <SpecItem
                    icon={<Ruler className="w-4 h-4" />}
                    label="Afmetingen"
                    value={`${product.length} x ${product.width} x ${product.height} cm`}
                    className="col-span-2"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Shipping Info Accordion */}
      {/* <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleTab("shipping")}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-semibold text-neutral-800">Verzending & Levering</span>
          </div>
          <ChevronDown
            className={clx("w-5 h-5 text-neutral-400 transition-transform", {
              "rotate-180": openTab === "shipping"
            })}
          />
        </button>

        {openTab === "shipping" && (
          <div className="p-4 pt-0 bg-white">
            <div className="space-y-3">
              <ShippingItem
                icon={<Clock className="w-4 h-4 text-gray-700" />}
                title="Snelle Levering"
                description="Bestellingen voor 12:00 worden dezelfde dag verzonden"
              />
              <ShippingItem
                icon={<Truck className="w-4 h-4 text-green-600" />}
                title="Levertijd"
                description="Binnen 2-5 werkdagen bij u thuis"
              />
              <ShippingItem
                icon={<CheckCircle2 className="w-4 h-4 text-blue-600" />}
                title="Track & Trace"
                description="Volg uw pakket met onze tracking service"
              />
            </div>
          </div>
        )}
      </div> */}

      {/* Returns Info Accordion */}
      {/* <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleTab("returns")}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-semibold text-neutral-800">Retourneren</span>
          </div>
          <ChevronDown
            className={clx("w-5 h-5 text-neutral-400 transition-transform", {
              "rotate-180": openTab === "returns"
            })}
          />
        </button>

        {openTab === "returns" && (
          <div className="p-4 pt-0 bg-white">
            <div className="space-y-3">
              <ShippingItem
                icon={<RotateCcw className="w-4 h-4 text-blue-600" />}
                title="14 Dagen Bedenktijd"
                description="Niet tevreden? Stuur het product binnen 14 dagen retour"
              />
              <ShippingItem
                icon={<Shield className="w-4 h-4 text-green-600" />}
                title="Gratis Retourneren"
                description="Retourneren is gratis en eenvoudig"
              />
            </div>
          </div>
        )}
      </div> */}

      {/* Guarantee Badge */}
      {/* <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Shield className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <p className="font-semibold text-neutral-800">Kwaliteitsgarantie</p>
          <p className="text-sm text-neutral-600">100% originele producten met garantie</p>
        </div>
      </div> */}
    </div>
  )
}

// Specification Item Component
const SpecItem = ({
  icon,
  label,
  value,
  className
}: {
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}) => (
  <div className={clx("flex items-center gap-3 p-3 bg-gray-50 rounded-lg", className)}>
    <div className="text-gray-700">{icon}</div>
    <div>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-sm font-medium text-neutral-800">{value}</p>
    </div>
  </div>
)

// Shipping Item Component
const ShippingItem = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-sm font-medium text-neutral-800">{title}</p>
      <p className="text-xs text-neutral-600">{description}</p>
    </div>
  </div>
)

export default ProductTabs
