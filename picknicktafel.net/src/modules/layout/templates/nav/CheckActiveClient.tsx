"use client"
import { useState, useEffect } from "react"

export default function CheckActiveClient() {
  const [authChecked, setAuthChecked] = useState(false)
  useEffect(() => {
    fetch("/api/active-client?group=cusgroup_01KEKMNE98JN0RXSRB3YZCS359").then(
        (res: any) => res.json()
        .then((res: any) => {
        console.log(res)
        if(res.authenticated == false){
          setAuthChecked(true)
        } else if (res?.customer?.exists_in_group) {
          setAuthChecked(true)
        } 
      })
    )
  }, [])
  return (
    <>
      {!authChecked && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 text-sm flex items-center justify-center">
          <p>
            Uw account moet nog gevalideerd worden. Tot die tijd is het niet
            mogelijk om een bestelling te plaatsen.
          </p>
        </div>
      )}
    </>
  )
}
