import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="bg-green-700 text-white text-center">Bel met Sander voor vragen <a href="tel:+31617360645">0617360645</a></div>
      {props.children}
      <Footer />
    </>
  )
}
