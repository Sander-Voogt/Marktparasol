"use server"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"

interface Hits {
  readonly objectID?: string
  id?: string
  [x: string | number | symbol]: unknown
}

const MEDUSA_STORE_SALES_CHANNEL_ID = "sc_01K5RS8ARYVAAAMA4BFMBMZH0T"

export async function search(query: string) {
  const queries = [
    {
      indexName: SEARCH_INDEX_NAME,
      params: {
        query,
        filter: [
          `sales_channels.id = "${MEDUSA_STORE_SALES_CHANNEL_ID}"`,
          `status = published`,
        ],
      },
    },
  ]

  const { results } = await searchClient.search(queries)

  const { hits } = results[0] as { hits: Hits[] }

  return hits
}
