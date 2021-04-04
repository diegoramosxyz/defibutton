const tags = [
  'amm',
  'bitcoin',
  'cefi',
  'defi',
  'dex',
  'ethereum',
  'extra',
  'fundamental',
  'lending',
  'safety',
  'smart-contract',
  'strategy',
  'tip',
  'tutorial',
  'wallet',
] as const

export type Tag = typeof tags[number]

export default tags
