import { tags } from './tags'

export interface Blog {
  slug: string
  tags: typeof tags[number][]
}

const blog: Blog[] = [
  {
    slug: '/blog/metamask',
    tags: ['wallet', 'safety', 'tutorial'],
  },
  {
    slug: '/blog/safety',
    tags: ['safety', 'tip'],
  },
  {
    slug: '/blog/glossary',
    tags: ['extra'],
  },
  {
    slug: '/blog/defi',
    tags: ['defi'],
  },
  {
    slug: '/blog/banks',
    tags: ['fundamental', 'cefi'],
  },
  {
    slug: '/blog/faq',
    tags: ['extra'],
  },
  {
    slug: '/blog/cefi-to-defi',
    tags: ['tutorial'],
  },
  {
    slug: '/blog/dex',
    tags: ['defi', 'dex'],
  },
  {
    slug: '/blog/trust',
    tags: ['extra'],
  },
  {
    slug: '/blog/smart-contract',
    tags: ['defi', 'smart-contract'],
  },
  {
    slug: '/blog/common-beginner-questions',
    tags: ['defi'],
  },
]

export default blog
