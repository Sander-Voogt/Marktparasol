"use client"
import Script from "next/script"

export default function contact() {
  return (
    <div className="flex flex-row max-w-7xl mx-auto">
      <div className="basis-1/2">
        <h1 className="text-2xl mb-4">Contact</h1>
        <p>
          Vul het contact formulier in aan de rechterzijde met uw vragen. Wij
          adviseren u graag met de keuze van je juiste bedrukking en parasol.
        </p>

        <ul className="mt-10">
          <li className="text-lg font-semibold">VGT Online</li>
          <li>
            Telefoon: <a href="tel:+31617360645">0617360645</a>
          </li>
          <li>
            Email:{" "}
            <a href="mailto:info@markt-parasol.nl">info@markt-parasol.nl</a>
          </li>
          <li>Prins der Nederlandenstraat 15</li>
          <li>3151SB Hoek van Holland</li>
          <li>(geen bezoekadres)</li>
        </ul>
      </div>
      <div className="basis-1/2">
        <iframe
          style={{ border: "none", width: "100%" }}
          id="my-form-9dbnns"
          src="http://form.evservice.eu/forms/my-form-9dbnns"
        ></iframe>
        <Script
          src="https://form.evservice.eu/widgets/iframe.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== "undefined" && window.initEmbed) {
              window.initEmbed("my-form-9dbnns")
            }
          }}
        />
      </div>
    </div>
  )
}
