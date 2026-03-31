import { Metadata } from "next"
import FAQAccordion from "@modules/common/components/faq-accordion"

export const metadata: Metadata = {
  title: "FAQ | Ric Holland",
  description: "Veelgestelde vragen over bestellingen, verzending, retourneren en meer.",
}

const faqData = [
  {
    category: "Bestellingen",
    questions: [
      {
        question: "Hoe plaats ik een bestelling?",
        answer: "Je kunt eenvoudig een bestelling plaatsen door producten aan je winkelwagen toe te voegen en vervolgens naar de checkout te gaan. Vul je gegevens in en kies een betaalmethode om je bestelling af te ronden."
      },
      {
        question: "Kan ik mijn bestelling annuleren?",
        answer: "Je kunt je bestelling annuleren zolang deze nog niet is verzonden. Neem zo snel mogelijk contact met ons op via e-mail of WhatsApp om je bestelling te annuleren."
      },
      {
        question: "Hoe kan ik mijn bestelling volgen?",
        answer: "Zodra je bestelling is verzonden, ontvang je een e-mail met een track & trace code. Hiermee kun je je pakket volgen op de website van de vervoerder."
      },
      {
        question: "Welke betaalmethoden accepteren jullie?",
        answer: "Wij accepteren iDEAL. Alle betalingen worden veilig verwerkt. Voor vaste klanten is er de mogelijkheid om op rekening te betalen."
      }
    ]
  },
  {
    category: "Verzending",
    questions: [
      {
        question: "Hoe lang duurt de levering?",
        answer: "Bestellingen geplaatst voor 12:00 uur worden dezelfde dag nog verzonden. De levertijd is meestal 1-2 werkdagen."
      },
      {
        question: "Wat zijn de verzendkosten?",
        answer: "Verzending binnen Nederland is gratis bij bestellingen vanaf €299. Voor bestellingen onder €299 betaal je €10,00 verzendkosten."
      }
    ]
  },
  {
    category: "Retourneren",
    questions: [
      {
        question: "Wat is het retourbeleid?",
        answer: "Je hebt 14 dagen bedenktijd na ontvangst van je bestelling. Producten moeten ongebruikt en in originele verpakking worden geretourneerd. Neem contact met ons op om een retour aan te melden."
      },
      {
        question: "Hoe retourneer ik een product?",
        answer: "Neem eerst contact met ons op via e-mail of WhatsApp. Wij sturen je retour instructies. Zodra wij het pakket hebben ontvangen en gecontroleerd, wordt het aankoopbedrag binnen 5 werkdagen teruggestort."
      },
      {
        question: "Zijn de retourkosten gratis?",
        answer: "De retourkosten zijn voor eigen rekening, tenzij het product beschadigd of defect is. In dat geval vergoeden wij de retourkosten."
      }
    ]
  },
  {
    category: "Producten",
    questions: [
      {
        question: "Zijn jullie producten van goede kwaliteit?",
        answer: "Ja, wij werken alleen met bekende en betrouwbare merken. Al onze producten voldoen aan de Europese kwaliteitsnormen en worden zorgvuldig geselecteerd."
      },
      {
        question: "Kan ik producten in bulk bestellen?",
        answer: "Ja, voor grote bestellingen bieden wij speciale prijzen aan. Neem contact met ons op voor een offerte op maat."
      },
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Veelgestelde vragen</h1>
        <p className="text-neutral-600 mb-8">
          Hier vind je antwoorden op de meest gestelde vragen. Staat je vraag er niet bij?
          Neem dan gerust contact met ons op.
        </p>

        <FAQAccordion categories={faqData} />

        {/* Contact CTA */}
        <div className="mt-12 p-6 bg-neutral-50 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">
            Nog vragen?
          </h2>
          <p className="text-neutral-600 mb-4">
            Ons team staat klaar om je te helpen.
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
  )
}
