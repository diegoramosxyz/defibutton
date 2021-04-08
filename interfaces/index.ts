export type PostMetadata = {
  title: string
  description: string
  author?: string
  // tags: string[]
  lastModified: string
}

export interface PostMetaPath extends PostMetadata {
  fileSlug: string
  folder: 'blog' | 'coin'
  tags: string[]
}

export type CoingeckoPrice = {
  usd: number
  usd_24h_change: number
  ticker: string
}
