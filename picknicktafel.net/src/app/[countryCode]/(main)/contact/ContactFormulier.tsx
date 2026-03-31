'use client'
import Script from "next/script"

export default function ContactFormulier() {
  return (
    <>
      <iframe
        id="markt-parasolnl-offerte-aanvraag-hfhk31"
        src="https://form.evservice.eu/forms/contact-form-sjbq6d"
        style={{ border: "none", width: "100%", minHeight: "800px" }}
      />

      <Script
        src="https://form.evservice.eu/widgets/iframe.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.initEmbed) {
            window.initEmbed("markt-parasolnl-offerte-aanvraag-hfhk31")
          }
        }}
      />
    </>
  )
}