import { Container, Text } from "@medusajs/ui"
import { useHits, useSearchBox } from "react-instantsearch-hooks-web"

import InteractiveLink from "@modules/common/components/interactive-link"

const ShowAll = () => {
  const { hits } = useHits()
  const { query } = useSearchBox()

  if (query === "") return null
  if (hits.length > 0 && hits.length <= 6) return null

  if (hits.length === 0) {
    return (
      <Container
        className="flex gap-2 justify-center h-fit py-2"
        data-testid="no-search-results-container"
      >
        <Text>Geen resultaten gevonden.</Text>
      </Container>
    )
  }

  return (
    <Container className="flex flex-col sm:flex-row gap-2 justify-center items-center h-fit py-3 sm:py-4">
      <Text className="text-sm sm:text-base text-center">De eerste resultaten worden getoond.</Text>
      <InteractiveLink href={`/results/${query}`}>Bekijk alle resultaten</InteractiveLink>
    </Container>
  )
}

export default ShowAll
