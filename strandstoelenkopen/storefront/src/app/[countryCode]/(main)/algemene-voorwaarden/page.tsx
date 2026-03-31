import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | Ric Holland",
  description: "Lees onze algemene voorwaarden voor het gebruik van onze webshop en diensten.",
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Algemene Voorwaarden</h1>
        <p className="text-gray-500 mb-8">Laatst bijgewerkt: januari 2025</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 1 - Definities</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In deze voorwaarden wordt verstaan onder:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Ondernemer:</strong> Ric Holland, gevestigd te Nederland</li>
              <li><strong>Consument:</strong> de natuurlijke persoon die niet handelt in de uitoefening van beroep of bedrijf en een overeenkomst aangaat met de ondernemer</li>
              <li><strong>Overeenkomst:</strong> een overeenkomst op afstand waarbij producten worden geleverd</li>
              <li><strong>Bedenktijd:</strong> de termijn waarbinnen de consument gebruik kan maken van zijn herroepingsrecht</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 2 - Identiteit van de ondernemer</h2>
            <div className="p-4 bg-gray-50 rounded-lg text-gray-600">
              <p><strong>Ric Holland</strong></p>
              <p>E-mail: info@richolland.nl</p>
              <p>Telefoon: +31 (0)624303358</p>
              <p>KvK-nummer: 64223884</p>
              <p>BTW-nummer: NL855573399B01</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 3 - Toepasselijkheid</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Deze algemene voorwaarden zijn van toepassing op elk aanbod van de ondernemer en op elke tot stand gekomen overeenkomst op afstand tussen ondernemer en consument.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Door het plaatsen van een bestelling geeft u te kennen dat u met de leverings- en betalingsvoorwaarden akkoord gaat.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 4 - Het aanbod</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Alle aanbiedingen zijn vrijblijvend, tenzij anders vermeld</li>
              <li>Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten</li>
              <li>Kennelijke vergissingen of fouten in het aanbod binden de ondernemer niet</li>
              <li>Afbeeldingen zijn een waarheidsgetrouwe weergave van de aangeboden producten</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 5 - De overeenkomst</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              De overeenkomst komt tot stand op het moment van aanvaarding door de consument van het aanbod en het voldoen aan de daarbij gestelde voorwaarden.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Na ontvangst van uw bestelling ontvangt u per e-mail een bevestiging met daarin de details van uw bestelling.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 6 - Herroepingsrecht</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bij de aankoop van producten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende 14 dagen. Deze bedenktermijn gaat in op de dag na ontvangst van het product.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking. Het product mag slechts worden uitgepakt voor zover dat nodig is om te beoordelen of hij het product wenst te behouden.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Let op:</strong> Producten die om hygiënische redenen verzegeld zijn, kunnen niet worden geretourneerd indien de verzegeling is verbroken.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 7 - Prijzen</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Alle prijzen zijn in euro's en exclusief BTW</li>
              <li>Verzendkosten worden apart vermeld bij het afrekenen</li>
              <li>Prijswijzigingen voorbehouden</li>
              <li>Eventuele kortingscodes zijn niet te combineren tenzij anders vermeld</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 8 - Betaling</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Betaling dient te geschieden voor verzending van de bestelling. Wij accepteren de volgende betaalmethoden:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>iDEAL</li>
              <li>Achteraf op basis van factuur</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 9 - Levering</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Bestellingen worden zo snel mogelijk verzonden, meestal binnen 1-2 werkdagen</li>
              <li>Bestellingen voor 16:00 uur worden dezelfde dag verzonden</li>
              <li>De uiterste leveringstermijn is 30 dagen, tenzij anders overeengekomen</li>
              <li>Het risico van beschadiging en/of vermissing van producten berust bij de ondernemer tot het moment van bezorging</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 10 - Klachtenregeling</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Klachten over de uitvoering van de overeenkomst moeten binnen bekwame tijd, volledig en duidelijk omschreven worden ingediend bij de ondernemer.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Bij ons ingediende klachten worden binnen een termijn van 14 dagen gerekend vanaf de datum van ontvangst beantwoord. Als een klacht een voorzienbaar langere verwerkingstijd vraagt, wordt binnen de termijn van 14 dagen geantwoord met een ontvangstbevestiging.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 11 - Geschillen</h2>
            <p className="text-gray-600 leading-relaxed">
              Op overeenkomsten tussen de ondernemer en de consument waarop deze algemene voorwaarden betrekking hebben, is uitsluitend Nederlands recht van toepassing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Artikel 12 - Aanvullende of afwijkende bepalingen</h2>
            <p className="text-gray-600 leading-relaxed">
              Aanvullende dan wel van deze algemene voorwaarden afwijkende bepalingen mogen niet ten nadele van de consument zijn en dienen schriftelijk te worden vastgelegd.
            </p>
          </section>

          {/* Contact CTA */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl text-center">
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              Vragen over onze voorwaarden?
            </h2>
            <p className="text-gray-600 mb-4">
              Neem gerust contact met ons op als iets niet duidelijk is.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Neem contact op
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
