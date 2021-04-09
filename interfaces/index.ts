export type SlugMetadata = {
  title: string
  description: string
  author?: string
  // tags: string[]
  lastModified: string
  tags?: string[]
}

export interface PostMetaPath extends SlugMetadata {
  slug: string
  folder: 'blog' | 'coin'
  tags: string[]
}

export type CoingeckoPrice = {
  usd: number
  usd_24h_change: number
  ticker: string
}
