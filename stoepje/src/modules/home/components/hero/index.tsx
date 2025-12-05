'use client'
import { sdk } from "@lib/config"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useEffect } from "react"

const Hero = () => {

  useEffect(() => {
    fetch('/api/auth-check')
      .then((res) => {
        
        console.log(res.json())
      })

      // .catch(() => {
      //     window.location.href = "/account"
      // })
  }, [])

  return (
    <div className="grid xl:max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="basis-1/2 m-8">
            <h3 className="text-5xl mb-8 mt-8">
              Bestel eenvoudig producten met het logo van stoepje.
            </h3>
            <p>Welkom om de Stoepje bestel website. U kunt hier eenvoudig producten bestellen voorzien van het Stoepje logo. Mis je een product laat het dan weten via het contact formulier.</p>
            <p>Het assortiment wordt nog aangevuld.</p>
          </div>
          <div className="basis-1/2 items-center">
            
          </div>
        </div>
      </div>
  )
}

export default Hero
