import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-24 px-8 flex flex-col justify-center items-center bg-white rounded-xl shadow-sm border border-gray-100"
      data-testid="empty-cart-message"
    >
      <div className="bg-gray-100 flex items-center justify-center w-24 h-24 rounded-full mb-8">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <Heading
        level="h1"
        className="text-2xl font-bold text-gray-900 tracking-tight mb-3"
      >
        Je winkelwagen is leeg
      </Heading>
      <Text className="text-base text-gray-500 mt-2 mb-8 max-w-md text-center">
        Je hebt nog niets in je winkelwagen. Ontdek onze producten en vind iets
        dat bij je past!
      </Text>
      <div>
        <InteractiveLink href="/store">Bekijk producten</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
