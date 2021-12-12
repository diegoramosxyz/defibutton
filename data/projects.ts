import { tags } from './tags'

const blockchains = [
  'ethereum',
  'bitcoin',
  'solana',
  'binance-smart-chain',
  'monero',
  'thorchain',
  'dogecoin',
] as const

export interface Protocol {
  blockchain: typeof blockchains[number]
  geckoId: string
  llamaId?: string
  name: string
  slug: string
  symbol: string
  tags: typeof tags[number][]
  social?: {
    twitter?: string
    reddit?: string
    discord?: string
    telegram?: string
    other?: string[]
  }
  domain: string
  whitepaper?: string
  sourceCode?: string
}

const projects: Protocol[] = [
  {
    blockchain: 'ethereum',
    geckoId: 'reserve',
    name: 'Reserve',
    slug: '/projects/reserve',
    symbol: 'rsv',
    tags: ['stable-coin'],
    domain: 'reserve.org',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'aave',
    llamaId: 'aave',
    name: 'AAVE',
    slug: '/projects/aave',
    symbol: 'aave',
    tags: ['protocol', 'lending'],
    domain: 'aave.com',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'uniswap',
    llamaId: 'uniswap',
    name: 'Uniswap',
    slug: '/projects/uniswap',
    symbol: 'uni',
    tags: ['amm', 'dex', 'protocol'],
    domain: 'uniswap.org',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'ethereum',
    name: 'Ethereum',
    slug: '/projects/ethereum',
    symbol: 'eth',
    tags: ['ethereum', 'fundamental', 'blockchain'],
    domain: 'ethereum.org',
  },
  {
    blockchain: 'bitcoin',
    geckoId: 'bitcoin',
    name: 'Bitcoin',
    slug: '/projects/bitcoin',
    symbol: 'btc',
    tags: ['fundamental', 'blockchain', 'bitcoin'],
    domain: 'bitcoin.org',
  },
  {
    blockchain: 'binance-smart-chain',
    geckoId: 'binancecoin',
    name: 'Binance Coin',
    slug: '/projects/binance-coin',
    symbol: 'bnb',
    tags: ['blockchain', 'ethereum'],
    domain: 'binance.com',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'chainlink',
    name: 'Chainlink',
    slug: '/projects/chainlink',
    symbol: 'link',
    tags: ['oracle'],
    domain: 'chain.link',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'sushi',
    llamaId: 'sushiswap',
    name: 'Sushiswap',
    slug: '/projects/sushiswap',
    symbol: 'sushi',
    tags: ['amm'],
    domain: 'sushi.com',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'compound-governance-token',
    llamaId: 'compound',
    name: 'Compound',
    slug: '/projects/compound',
    symbol: 'comp',
    tags: ['lend', 'borrow'],
    domain: 'compound.finance',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'republic-protocol',
    llamaId: 'renvm',
    name: 'REN',
    slug: '/projects/ren',
    symbol: 'ren',
    tags: [],
    domain: 'renproject.io',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'yearn-finance',
    llamaId: 'yearn-finance',
    name: 'yearn.finance',
    slug: '/projects/yearn-finance',
    symbol: 'yfi',
    tags: ['yield'],
    domain: 'yearn.finance',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'havven',
    llamaId: 'synthetix',
    name: 'Synthetix Network Token',
    slug: '/projects/synthetix-network-token',
    symbol: 'snx',
    tags: ['derivative'],
    domain: 'synthetix.io',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'loopring',
    llamaId: 'loopring',
    name: 'Loopring',
    slug: '/projects/loopring',
    symbol: 'lrc',
    tags: ['layer2'],
    domain: 'loopring.org',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'maker',
    llamaId: 'makerdao',
    name: 'Maker',
    slug: '/projects/maker',
    symbol: 'mrk',
    tags: ['dao'],
    domain: 'makerdao.com',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'dai',
    name: 'Dai',
    slug: '/projects/dai',
    symbol: 'dai',
    tags: ['stable-coin'],
    domain: 'makerdao.com',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'the-graph',
    name: 'The Graph',
    slug: '/projects/the-graph',
    symbol: 'grt',
    tags: [],
    domain: 'thegraph.com',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'matic-network',
    llamaId: 'polygon',
    name: 'Polygon',
    slug: '/projects/polygon',
    symbol: 'matic',
    tags: [],
    domain: 'matic.network',
  },
  {
    blockchain: 'monero',
    geckoId: 'monero',
    name: 'Monero',
    slug: '/projects/monero',
    symbol: 'xmr',
    tags: ['privacy'],
    domain: 'getmonero.org',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'rari-governance-token',
    llamaId: 'rari-capital',
    name: 'Rari Capital',
    slug: '/projects/rari-capital',
    symbol: 'rgt',
    tags: ['yield', 'ethereum'],
    domain: 'rari.capital',
  },
  {
    blockchain: 'ethereum',
    geckoId: 'defipulse-index',
    name: 'DeFiPulse Index',
    slug: '/projects/defi-pulse-index',
    symbol: 'dpi',
    tags: ['index'],
    domain: 'indexcoop.com/dpi',
  },
  {
    blockchain: 'solana',
    geckoId: 'solana',
    name: 'Solana',
    slug: '/projects/solana',
    symbol: 'sol',
    tags: ['blockchain'],
    domain: 'solana.com',
  },
  {
    blockchain: 'dogecoin',
    geckoId: 'dogecoin',
    name: 'Dogecoin',
    slug: '/projects/dogecoin',
    symbol: 'doge',
    tags: ['meme'],
    domain: 'dogecoin.com',
  },
  {
    blockchain: 'thorchain',
    geckoId: 'thorchain',
    llamaId: 'thorchain',
    name: 'THORChain',
    slug: '/projects/thorchain',
    symbol: 'rune',
    tags: ['interoperability'],
    domain: 'thorchain.org',
  },
  {
    blockchain: 'ethereum',
    geckoId: '0x',
    name: '0x',
    slug: '/projects/0x',
    symbol: 'zrx',
    tags: ['dex'],
    domain: '0x.org',
  },
]

export default projects
