import { getProductsList } from '@lib/data/products'
import type { MetadataRoute } from 'next'


export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  type RecordList = {
    url: string,
    lastModified: string,
    changeFrequency: "yearly" | "always" | "hourly" | "daily" | "weekly" | "monthly" | "never" | undefined;
    priority?: number | undefined;
  }

  let next = 0
  const recordlist: RecordList[] = []
  while (next !== null) {

    const { response, nextPage } = await getProductsList({ 
      pageParam: next, countryCode: 'nl',
    })
    
    response.products.map((product) => (
      recordlist.push({
        url: `https://actieparasol.nl/products/${product.handle}`,
        lastModified: product.updated_at ? product.updated_at : '-',
        changeFrequency: 'weekly',
        priority: 1,
      })
    ))

    recordlist.push({
      url: 'https://actieparasol.nl/offerte-aanvragen',
      lastModified: '2025-09-15T20:59:27.144Z',
      changeFrequency: 'weekly',
      priority: 1,
    })

    if (nextPage != null) {
      next = nextPage
    } else {
      // @ts-ignore
      next = null
    }

  }

  return recordlist


}
