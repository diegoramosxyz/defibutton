import { tags } from './tags'

export interface Index {
  slug: string
  tags: typeof tags[number][]
}

const index: Index[] = [
  {
    slug: '/index/borrow',
    tags: ['strategy'],
  },
  {
    slug: '/index/earn',
    tags: ['strategy'],
  },
  {
    slug: '/index/hold',
    tags: ['strategy'],
  },
  {
    slug: '/index/lend',
    tags: ['strategy'],
  },
  {
    slug: '/index/spend',
    tags: ['strategy'],
  },
  {
    slug: '/index/invest',
    tags: ['strategy'],
  },
  {
    slug: '/index/trade',
    tags: ['strategy'],
  },
  {
    slug: '/index/stake',
    tags: ['strategy'],
  },
]

export default index
