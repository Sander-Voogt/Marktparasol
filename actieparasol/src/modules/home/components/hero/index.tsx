import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="grid xl:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="basis-1/2 m-8 bg-[#ff4713] rounded-md p-6">
          <h3 className="text-5xl mb-8 mt-8 text-white">Kies uw parasol</h3>
          <p className="text-xl leading-7 text-white">
            Stel uw eigen parasol, marktkraam of tent samen.
          </p>
          <a
            href="/store"
            className="bg-white rounded-md text-[#ff4713] p-4 mt-4 block"
          >
            Parasols bekijken
          </a>
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
