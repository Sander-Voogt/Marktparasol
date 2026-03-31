"use client"

import { useEffect } from "react"
import { useSearchBox } from "react-instantsearch-hooks-web"

export default function SearchSync({ query }: { query: string }) {
  const { refine } = useSearchBox()

  useEffect(() => {
    refine(query)
  }, [query, refine])

  return null
}
