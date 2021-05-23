import { tags } from './tags'

export interface doc {
  slug: string
  tags: typeof tags[number][]
}

const docs: doc[] = [
  {
    slug: 'metamask',
    tags: ['wallet', 'safety', 'tutorial'],
  },
  {
    slug: 'safety',
    tags: ['safety', 'tip'],
  },
  {
    slug: 'glossary',
    tags: ['extra'],
  },
  {
    slug: 'borrow',
    tags: ['strategy'],
  },
  {
    slug: 'earn',
    tags: ['strategy'],
  },
  {
    slug: 'defi',
    tags: ['defi'],
  },
  {
    slug: 'hold',
    tags: ['strategy'],
  },
  {
    slug: 'lend',
    tags: ['strategy'],
  },
  {
    slug: 'spend',
    tags: ['strategy'],
  },
  {
    slug: 'banks',
    tags: ['fundamental', 'cefi'],
  },
  {
    slug: 'invest',
    tags: ['strategy'],
  },
  {
    slug: 'faq',
    tags: ['extra'],
  },
  {
    slug: 'cefi-to-defi',
    tags: ['tutorial'],
  },
  {
    slug: 'trade',
    tags: ['strategy'],
  },
  {
    slug: 'dex',
    tags: ['defi', 'dex'],
  },
  {
    slug: 'trust',
    tags: ['extra'],
  },
  {
    slug: 'smart-contract',
    tags: ['defi', 'smart-contract'],
  },
  {
    slug: 'stake',
    tags: ['strategy'],
  },
  {
    slug: 'index',
    tags: [],
  },
  {
    slug: 'common-beginner-questions',
    tags: ['defi'],
  },
]

export default docs
