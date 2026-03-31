import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verzending en Retour | Ric Holland",
  description: "Informatie over verzending, levertijden en retourneren bij Ric Holland.",
}

export default function VerzendingRetourPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Verzending en Retour</h1>

        {/* Shipping Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </span>
            Verzending
          </h2>

          <div className="space-y-6">
            {/* Shipping Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-green-800">Gratis verzending</h3>
                </div>
                <p className="text-green-700 text-sm">Bij bestellingen vanaf €299,-</p>
              </div>

              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-blue-800">Snelle levering</h3>
                </div>
                <p className="text-blue-700 text-sm">1-2 werkdagen in Nederland</p>
              </div>
            </div>

            {/* Shipping Table */}
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Land</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Verzendkosten</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Levertijd</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-neutral-600">Nederland</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">Gratis vanaf €299,00 / €10,00</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">1-2 werkdagen</td>
                  </tr>
                  {/* <tr>
                    <td className="px-4 py-3 text-sm text-neutral-600">België</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">Gratis vanaf €50 / €6,95</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">2-4 werkdagen</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-neutral-600">Duitsland</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">€8,95</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">3-5 werkdagen</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-neutral-600">Overige EU</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">Vanaf €12,95</td>
                    <td className="px-4 py-3 text-sm text-neutral-600">5-7 werkdagen</td>
                  </tr> */}
                </tbody>
              </table>
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h3 className="font-semibold text-neutral-800 mb-2">Belangrijk om te weten</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Bestellingen voor 12:00 uur worden dezelfde dag verzonden
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Je ontvangt een track & trace code per e-mail
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Verzending via PostNL of DHL
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Returns Section */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </span>
            Retourneren
          </h2>

          <div className="space-y-6">
           
            {/* Return Steps */}
            <div className="p-6 border border-neutral-200 rounded-xl">
              <h3 className="font-semibold text-neutral-800 mb-4">Hoe retourneer ik?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-semibold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-neutral-800">Meld je retour aan</h4>
                    <p className="text-sm text-neutral-600">Neem contact op via e-mail of WhatsApp met je ordernummer</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-semibold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-neutral-800">Verpak het product</h4>
                    <p className="text-sm text-neutral-600">Zorg dat het product ongebruikt en in originele verpakking zit</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-semibold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium text-neutral-800">Verstuur het pakket</h4>
                    <p className="text-sm text-neutral-600">Gebruik het retourlabel dat wij je toesturen</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-semibold text-sm flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium text-neutral-800">Ontvang je geld terug</h4>
                    <p className="text-sm text-neutral-600">Binnen 5 werkdagen na ontvangst storten wij het bedrag terug</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Conditions */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Retourvoorwaarden
              </h3>
              <ul className="space-y-1 text-sm text-amber-700">
                <li>• Product moet ongebruikt en in originele verpakking zijn</li>
                <li>• Retour binnen 14 dagen na ontvangst</li>
                <li>• Retourkosten zijn voor eigen rekening (tenzij product defect is)</li>
                <li>• Hygiëneproducten kunnen niet worden geretourneerd</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-12 p-6 bg-neutral-50 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">
            Nog vragen over verzending of retour?
          </h2>
          <p className="text-neutral-600 mb-4">
            Neem gerust contact met ons op. Wij helpen je graag!
          </p>
          <a
            href="/contact"
            className="inline-block bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Neem contact op
          </a>
        </div>
      </div>
    </div>
  )
}
