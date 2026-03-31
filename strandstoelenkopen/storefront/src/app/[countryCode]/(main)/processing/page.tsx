'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProcessingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cartId = searchParams.get('cartId')
  const countryCode = searchParams.get('country_code') || 'nl'  // fallback naar nl

  const [message, setMessage] = useState('Betaling wordt verwerkt...')

  useEffect(() => {
    if (!cartId) {
      setMessage('Geen bestelling gevonden. Probeer het opnieuw.')
      return
    }

    let timeoutId: NodeJS.Timeout

    const checkOrder = async () => {
      try {
        const res = await fetch(`/api/check-order?cartId=${cartId}`)
        if (!res.ok) {
          throw new Error('Check mislukt')
        }

        const data = await res.json()

        if (data.orderId) {
          // Order gevonden → direct doorsturen naar confirmed page
          router.replace(`/${countryCode}/order/confirmed/${data.orderId}`)
        } else {
          // Nog niet → wacht en probeer opnieuw
          setMessage('Nog even geduld... de betaling wordt bevestigd')
          timeoutId = setTimeout(checkOrder, 4000) // elke 4 seconden checken
        }
      } catch (err) {
        console.error('Order check error:', err)
        setMessage('Er lijkt iets mis te gaan. Probeer de pagina te verversen.')
        timeoutId = setTimeout(checkOrder, 8000) // langere pauze bij error
      }
    }

    // Start direct
    checkOrder()

    // Cleanup bij unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [cartId, router, countryCode])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Bedankt voor je bestelling!
        </h1>
        <p className="text-lg text-gray-600 mb-8">{message}</p>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
        <p className="mt-6 text-sm text-gray-500">
          Dit duurt meestal maar een paar seconden...
        </p>
      </div>
    </div>
  )
}