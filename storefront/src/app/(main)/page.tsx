import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts("nl")
  const region = await getRegion("nl")

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <div className="max-w-7xl mx-auto text-lg">
        <h3
          className="text-xl font-semibold"
          id="maak-indruk-met-onze-vierkante-marktparasols-functioneel-stijlvol-en-uniek"
        >
          Maak Indruk met Onze Vierkante Marktparasols - Functioneel, Stijlvol
          en Uniek
        </h3>
        <p className="leading-7 ">
          Transformeer je marktstand, terras, tuin of evenement met onze
          vierkante marktparasols van topkwaliteit. Deze parasols combineren
          praktische functionaliteit met een oogstrelend design en zijn
          beschikbaar in vier zorgvuldig gekozen formaten, zodat er altijd een
          optie is die perfect bij jouw ruimte past:{" "}
        </p>
        <ul>
          <li className="my-2">
            <strong>2.0m x 3.0m</strong> - ideaal voor kleinere opstellingen,
            compact maar ruim genoeg om op te vallen{" "}
          </li>
          <li className="my-2">
            <strong>2.5m x 3.0m</strong> - een slimme tussenmaat voor wie net
            iets meer schaduw of dekking zoekt{" "}
          </li>
          <li className="my-2">
            <strong>3.0m x 3.0m</strong> - een prachtig vierkant formaat dat
            balans en symmetrie uitstraalt{" "}
          </li>
          <li className="my-2">
            <strong>3.0m x 4.0m</strong> - royaal en indrukwekkend, perfect voor
            grotere stands of gezellige buitenruimtes{" "}
          </li>
        </ul>
        <p className="leading-7 text-md">
          Of je nu een lokale ondernemer bent die je producten in de spotlight
          wil zetten, een horeca-eigenaar die gasten comfortabel schaduw biedt,
          of gewoon een unieke eyecatcher zoekt voor je eigen tuin - onze
          parasols passen zich aan jouw wensen aan.
        </p>
        <h4
          className="my-4 text-xl font-semibold"
          id="een-design-dat-bij-jou-past"
        >
          Een Design dat Bij Jou Past
        </h4>
        <p className="leading-7 text-md">
          Met onze parasols voeg je niet alleen schaduw toe, maar ook karakter.
          Kies uit onze vrolijke en originele thema&apos;s, zoals de
          oer-Hollandse <strong>Haring</strong> of de zoete charme van{" "}
          <strong>Stroopwafels</strong>. Deze speelse ontwerpen brengen een
          glimlach en maken je parasol tot een echte conversation starter. Voor
          wie houdt van een meer klassieke uitstraling hebben we{" "}
          <strong>effen kleuren stof</strong> in een breed palet - van warm rood
          tot fris groen of stijlvol antraciet. Liever een tijdloze twist? Onze{" "}
          <strong>gestreepte stof</strong> combineert elegantie met een vleugje
          nostalgie, perfect voor een chique terras of een gezellige markt.{" "}
        </p>
        <h4
          className="my-4 text-xl font-semibold"
          id="maak-het-persoonlijk-met-jouw-eigen-ontwerp"
        >
          Maak Het Persoonlijk met Jouw Eigen Ontwerp
        </h4>
        <p className="leading-7 text-md">
          Wil je iets dat volledig uniek is? Laat je parasol bedrukken met je{" "}
          <strong>eigen logo</strong>, slogan of ontwerp! Of je nu een bedrijf
          runt, een evenement organiseert of je merk wilt promoten, met een
          gepersonaliseerde parasol creëer je een professionele en herkenbare
          uitstraling. Onze bedrukkingsopties zijn flexibel en van hoge
          kwaliteit, zodat jouw visie perfect tot leven komt op het doek.{" "}
        </p>
        <h4
          className="my-4 text-xl font-semibold"
          id="waarom-kiezen-voor-onze-marktparasols-"
        >
          Waarom Kiezen Voor Onze Marktparasols?
        </h4>
        <p className="leading-7 text-md">
          Onze parasols zijn meer dan alleen een praktische oplossing tegen zon
          of een lichte regenbui. Ze zijn stevig, duurzaam en ontworpen om
          jarenlang mee te gaan, zelfs bij intensief gebruik. Dankzij het
          vierkante ontwerp bieden ze optimale dekking en een moderne look die
          in elke omgeving opvalt. Combineer dat met onze uitgebreide
          keuzemogelijkheden in maten, stoffen en bedrukkingen, en je hebt een
          product dat zowel functioneel als esthetisch een schot in de roos is.{" "}
        </p>
        <h4 className="my-4 text-xl font-semibold" id="bestel-vandaag-nog">
          Bestel Vandaag Nog
        </h4>
        <p className="leading-7 text-md">
          Laat je inspireren en geef jouw ruimte de upgrade die het verdient. Of
          je nu kiest voor een thema dat je roots viert, een strakke effen kleur
          of een op maat gemaakte creatie met je logo - met onze vierkante
          marktparasols maak je van elke gelegenheid iets bijzonders. Neem
          contact met ons op voor meer informatie of bestel direct jouw
          favoriete parasol. Wij staan klaar om je te helpen stralen, waar je
          ook bent!
        </p>
      </div>
    </>
  )
}
