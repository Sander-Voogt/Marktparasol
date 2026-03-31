import { Metadata } from "next"
import ContactFormulier from "./ContactFormulier"

export const metadata: Metadata = {
  title: "Contact | Ric Holland",
  description: "Neem contact met ons op. Wij helpen je graag met al je vragen.",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Contact</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Linker kolom – Contactgegevens */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">
              Contactgegevens
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">E-mail</h3>
                  <a
                    href="mailto:info@richolland.nl"
                    className="text-gray-900 hover:underline"
                  >
                    info@richolland.nl
                  </a>
                </div>
              </div>
                <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
                  
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">Adres</h3>
                  <p>H.Unluer en Z.Unluer V.O.F. - Ric Holland</p>
                  <p>Kort-Ambachtlaan 24 B</p>
                  <p>3333EP Zwijndrecht</p>
                  <p>KvK-nummer: 64223884</p>
                  <p>BTW-nummer: NL855573399B01</p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">Telefoon</h3>
                  <a
                    href="tel:+31624303358"
                    className="text-gray-900 hover:underline"
                  >
                    +31 (0)624303358
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 flex-shrink-0">
                  💬
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">WhatsApp</h3>
                  <a
                    href="https://wa.me/31624303358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Chat met ons
                  </a>
                </div>
              </div>

              {/* Openingstijden */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
                  ⏰
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">
                    Openingstijden
                  </h3>
                  <p className="text-neutral-600">
                    Maandag - Vrijdag: 9:00 - 18:00
                  </p>
                  <p className="text-neutral-600">
                    Zaterdag - Zondag: Gesloten
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rechter kolom – Contactformulier */}
          <div className="w-full max-w-[550px]">
            <ContactFormulier />
          </div>

        </div>
      </div>
    </div>
  )
}