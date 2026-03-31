import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Ric Holland",
  description: "Lees ons privacybeleid en hoe wij omgaan met uw persoonlijke gegevens.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Laatst bijgewerkt: januari 2025</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">1. Inleiding</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ric Holland respecteert de privacy van alle gebruikers van haar website en draagt er zorg voor dat de persoonlijke informatie die u ons verschaft vertrouwelijk wordt behandeld. Wij gebruiken uw gegevens om bestellingen zo snel en gemakkelijk mogelijk te laten verlopen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">2. Welke gegevens verzamelen wij?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Wij verzamelen de volgende persoonsgegevens wanneer u een bestelling plaatst of een account aanmaakt:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Naam en adresgegevens</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Betaalgegevens</li>
              <li>Bestelgeschiedenis</li>
              <li>IP-adres en browsergegevens</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Uw gegevens worden gebruikt voor de volgende doeleinden:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Het verwerken en verzenden van uw bestelling</li>
              <li>Het versturen van orderbevestigingen en verzendnotificaties</li>
              <li>Het afhandelen van betalingen</li>
              <li>Het beantwoorden van vragen via onze klantenservice</li>
              <li>Het verbeteren van onze website en dienstverlening</li>
              <li>Het versturen van nieuwsbrieven (alleen met uw toestemming)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">4. Delen van gegevens met derden</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Wij delen uw gegevens alleen met derden indien dit noodzakelijk is voor het uitvoeren van onze diensten:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Bezorgdiensten (PostNL, DHL) voor het verzenden van uw pakket</li>
              <li>Betalingsproviders voor het verwerken van uw betaling</li>
              <li>Hostingproviders voor het beheren van onze website</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Wij verkopen uw gegevens nooit aan derden voor marketingdoeleinden.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">5. Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Onze website maakt gebruik van cookies om uw winkelervaring te verbeteren. Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen. Wij gebruiken:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Functionele cookies:</strong> noodzakelijk voor het functioneren van de website</li>
              <li><strong>Analytische cookies:</strong> om het gebruik van de website te analyseren</li>
              <li><strong>Marketing cookies:</strong> alleen met uw toestemming</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">6. Beveiliging</h2>
            <p className="text-gray-600 leading-relaxed">
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen verlies, misbruik en ongeautoriseerde toegang. Onze website maakt gebruik van SSL-encryptie voor veilige gegevensoverdracht.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">7. Uw rechten</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              U heeft het recht om:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Uw persoonsgegevens in te zien</li>
              <li>Uw persoonsgegevens te laten corrigeren</li>
              <li>Uw persoonsgegevens te laten verwijderen</li>
              <li>Bezwaar te maken tegen het verwerken van uw gegevens</li>
              <li>Uw gegevens over te dragen naar een andere partij</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">8. Bewaartermijn</h2>
            <p className="text-gray-600 leading-relaxed">
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij zijn verzameld. Bestelgegevens worden 7 jaar bewaard in verband met fiscale verplichtingen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">9. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Heeft u vragen over ons privacybeleid of wilt u gebruik maken van uw rechten? Neem dan contact met ons op via:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>E-mail:</strong> info@richolland.nl<br />
                <strong>Telefoon:</strong> +31 (0)624303358
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
