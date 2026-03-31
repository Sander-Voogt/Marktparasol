"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function AgeGate() {
  const [showGate, setShowGate] = useState(false)

  useEffect(() => {
    const ageConfirmed = localStorage.getItem("ageConfirmed")
    if (!ageConfirmed) {
      setShowGate(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem("ageConfirmed", "true")
    setShowGate(false)
    document.body.style.overflow = "unset"
  }

  const handleDecline = () => {
    window.location.href = "https://www.google.com"
  }

  if (!showGate) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-description"
    >
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="flex flex-row">
          <Image
            src="https://user.fm/files/v2-440e0bb07a929e996c6a98fbc0257f71/RIC-HOLLAND.svg"
            alt="RIC Holland"
            width={140}
            height={140}
            style={{
              width: "140px",
              margin: "0 auto 8px",
            }}
          />
          <Image
            src="/nix-18.svg"
            alt="RIC Holland"
            width={140}
            height={140}
            style={{
              width: "140px",
              margin: "0 auto 8px",
            }}
          />
        </div>

        {/* <h2 id="age-gate-title" className="text-3xl font-bold mb-4">
          18+ Check
        </h2> */}
        <p
          id="age-gate-description"
          className="mb-6 text-gray-700 text-base sm:text-lg leading-relaxed"
        >
          Deze website is bedoeld voor bezoekers van 18 jaar of ouder. Bevestig
          dat je 18+ bent om door te gaan.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
            autoFocus
          >
            Ik ben 18 jaar of ouder
          </button>
          <button
            onClick={handleDecline}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors w-full"
          >
            Ik ben jonger dan 18
          </button>
        </div>
      </div>
    </div>
  )
}
