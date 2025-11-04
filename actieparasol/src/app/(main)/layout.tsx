import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <div className="font-sans">
        {/* Hero Section */}
        <section className="text-center py-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Stel je eigen parasol of tent samen
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Actieparasol.nl levert verschillende maten en kleuren parasols en
            tenten. Daarnaast kunt u zijzeilen met of zonder raam bij de parasol
            of tent in uw gewenste kleur bestellen.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition">
            Bekijk onze producten →
          </button>
        </section>

        {/* Info Section */}
        <section className="bg-gray-100 rounded-3xl mx-4 md:mx-12 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Klanten kiezen voor</h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-gray-600 font-bold">Logo</span>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                ✅ Klanten geven actieparasol.nl een 4.5/5
              </li>
              <li className="flex items-center gap-2">
                ✅ 14 dagen bedenktijd
              </li>
              <li className="flex items-center gap-2">✅ Betrouwbaar</li>
            </ul>
          </div>

          {/* Image Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-48 h-64 bg-gray-300 rounded-2xl flex items-center justify-center">
              <span className="text-gray-600 font-bold">Foto</span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 text-center md:text-left px-4 md:px-12 py-8 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold flex items-center gap-2">📍 Adres</h3>
              <p className="text-gray-700">
                Prins der Nederlandenstraat 15
                <br />
                3151 SB Hoek van Holland
              </p>
            </div>

            <div>
              <h3 className="font-bold flex items-center gap-2">💬 Mail ons</h3>
              <p className="text-gray-700">info@actieparasol.nl</p>
            </div>

            <div>
              <h3 className="font-bold flex items-center gap-2">☎️ Bel ons</h3>
              <p className="text-gray-700">0617360645</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-600 flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-gray-900">
              Algemene voorwaarden
            </a>
            <a href="#" className="hover:text-gray-900">
              Over ons
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
            <a href="#" className="hover:text-gray-900">
              Strandstoelen kopen
            </a>
            <a href="#" className="hover:text-gray-900">
              Abraham Sarah huren
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
