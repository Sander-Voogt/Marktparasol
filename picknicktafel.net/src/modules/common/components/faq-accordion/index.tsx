"use client"

import { useState } from "react"

type FAQItem = {
  question: string
  answer: string
}

type FAQCategory = {
  category: string
  questions: FAQItem[]
}

type FAQAccordionProps = {
  categories: FAQCategory[]
}

export default function FAQAccordion({ categories }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <div key={category.category}>
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            {category.category}
          </h2>
          <div className="space-y-3" role="list">
            {category.questions.map((item, questionIndex) => {
              const itemKey = `${categoryIndex}-${questionIndex}`
              const isOpen = openItems[itemKey]
              const panelId = `faq-panel-${itemKey}`
              const buttonId = `faq-button-${itemKey}`

              return (
                <div
                  key={itemKey}
                  className="border border-neutral-200 rounded-lg overflow-hidden"
                  role="listitem"
                >
                  <button
                    id={buttonId}
                    onClick={() => toggleItem(itemKey)}
                    className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-neutral-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-medium text-neutral-800 pr-4">
                      {item.question}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-5 h-5 text-neutral-500 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-4 pb-4 bg-neutral-50"
                    >
                      <p className="text-neutral-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
