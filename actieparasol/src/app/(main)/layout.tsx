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
       

        {/* Info Section */}
        <section className="bg-gray-100 rounded-3xl mx-4 md:mx-12 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Section */}
            <h2 className="text-2xl font-bold mb-4">Klanten kiezen voor</h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-120 h-30 rounded flex items-center justify-center">
                <span className="font-bold"><img src="/img/actieparasol-logo.svg" width={200} height={60}/></span>
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

          {/* Image Placeholder */}
          {/* <div className="flex-shrink-0">
            <img src="/img/footer-image.png" />
          </div> */}
        </section>

        {/* Contact Section */}
       
      </div>
      <Footer />
    </>
  )
}
