import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="grid xl:max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="basis-1/2 m-8">
            <h3 className="text-5xl mb-8 mt-8">
              Sterke Marktparasollen Nodig?
            </h3>
            <p className="text-xl leading-7 ">
              Op zoek naar een stevige en duurzame marktparasol?
              <br />
              Onze hoogwaardige parasols bieden optimale bescherming en zijn
              eenvoudig in te klappen, zodat je snel en efficiënt kunt werken.
              <br />
              Dankzij de robuuste constructie en weerbestendige materialen ben
              je verzekerd van een lange levensduur. <br />
              Kies voor kwaliteit en gemak met onze marktparasols!
            </p>
            <button className="text-white text-xl font-semibold mt-8 bg-yellowGreen hover:bg-amber-500 focus:ring-4 focus:ring-amber-600 font-medium rounded-sm text-sm px-5 p-2 me-2 mb-2 ">
              Koop parasol
            </button>
          </div>
          <div className="basis-1/2 items-center">
            <img
              src="https://markt-parasol.nl/img/marktparasols-groen-wit.jpg"
              alt=""
              height={600}
              width={600}
            />
          </div>
        </div>
      </div>
  )
}

export default Hero
