const tags = [
  'amm',
  'bitcoin',
  'blockchain',
  'cefi',
  'defi',
  'dex',
  'ethereum',
  'extra',
  'fundamental',
  'lending',
  'protocol',
  'safety',
  'smart-contract',
  'strategy',
  'tip',
  'tutorial',
  'wallet',
] as const

export type Tag = typeof tags[number]

export default tags
