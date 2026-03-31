import { Text } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="w-full mt-auto">
      {/* Main Footer */}
      <div className="bg-white border-t border-gray-200 shadow-sm">
        <div className="content-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <LocalizedClientLink href="/" className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <Image
                    src="/RIC_HOLLAND_LOGO.png"
                    alt="Ric Holland"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900 uppercase">
                  Ric Holland
                </span>
              </LocalizedClientLink>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jouw bestemming voor kwaliteit rookaccessoires met snelle levering.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <LocalizedClientLink
                    href="/categories/vloei"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Vloei
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/categories/filters-tips"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Tips
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/categories/hulzen"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Hulzen
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Alle producten
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Klantenservice */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Klantenservice</h3>
              <ul className="space-y-3">
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/verzending-retour"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Verzending & Retour
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/faq"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@richolland.nl"
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    info@richolland.nl
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+31612345678"
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    +31 (0)624303358
                  </a>
                </li>
                <li className="flex gap-3 pt-2">
                 
                  <a
                    href="https://wa.me/31624303358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-green-100 hover:bg-green-500 hover:text-white flex items-center justify-center text-green-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="content-container py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <Text className="text-gray-800 text-sm">
            © {new Date().getFullYear()} Ric Holland. Alle rechten voorbehouden.
          </Text>
          <div className="flex gap-6 text-sm">
            <LocalizedClientLink href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </LocalizedClientLink>
            <LocalizedClientLink href="/algemene-voorwaarden" className="text-gray-600 hover:text-gray-900 transition-colors">
              Algemene voorwaarden
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}


export function AboutUsSection() {
  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="content-container max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          Over ons
        </h2>

        <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed text-left">
          <p>
            Ons bedrijf is ontstaan vanuit <strong>17 jaar ervaring</strong> als Primera-ondernemer.
            Vanuit deze jarenlange praktijkervaring weten wij precies wat er speelt op de winkelvloer en waar ondernemers behoefte aan hebben: betrouwbare levering, een overzichtelijk assortiment en vooral scherpe prijzen met een sterke prijs-kwaliteitverhouding.
          </p>

          <p>
            Daarom zijn wij gestart met deze webshop en groothandel. Door efficiënt in te kopen en met korte lijnen te werken, kunnen wij onze klanten een <strong>structureel prijsvoordeel</strong> bieden ten opzichte van veel andere groothandels, zonder concessies te doen aan kwaliteit of service.
          </p>

          <p>
            Wij leveren een zorgvuldig samengesteld assortiment met bekende en populaire producten die in de praktijk goed verkopen. Service, transparantie en meedenken met de klant staan bij ons centraal. Ons doel is het opbouwen van langdurige samenwerkingen, waarbij ondernemers kunnen rekenen op duidelijke afspraken, eerlijke prijzen en een betrouwbare levering.
          </p>
        </div>
      </div>
    </section>
  )
}
