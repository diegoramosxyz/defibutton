export type PostMetadata = {
  title: string
  description: string
  author?: string
  tags: string[]
  lastEdit?: string
  symbol?: string // Used to fetch logos
}

export interface PostMetaPath extends PostMetadata {
  filePath: string
}

export type CoingeckoPrice = {
  usd: number
  usd_24h_change: number
  ticker: string
}
