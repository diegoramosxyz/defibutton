import { useTranslation } from 'next-i18next'
import React from 'react'
import { PostMetaPath } from 'interfaces'
import MdxCard from './MdxCard'
import Link from 'next/link'

const tableOfContents: {
  [key: string]: { items: string[]; more?: string }
}[] = [
  {
    'start-here': {
      items: [
        '/blog/common-beginner-questions',
        '/blog/defi',
        '/blog/smart-contract',
        '/blog/dex',
      ],
      more: '/blog',
    },
  },
  {
    'defi-projects': {
      items: [
        '/coin/bitcoin',
        '/coin/ethereum',
        '/coin/uniswap',
        '/coin/aave',
        '/coin/binance-coin',
        '/coin/sushiswap',
      ],
      more: '/coin',
    },
  },
  {
    'the-old-financial-system': {
      items: ['/blog/banks'],
      more: '/tag/cefi',
    },
  },
  {
    tutorials: {
      items: ['/blog/cefi-to-defi', '/blog/metamask'],
      more: '/tag/tutorial',
    },
  },
  { safety: { items: ['/blog/safety'], more: '/tag/safety' } },
  {
    others: {
      items: ['/blog/glossary', '/blog/faq', '/blog/trust'],
      more: '/tag/extra',
    },
  },
]

export default function TableOfContents({ posts }: { posts: PostMetaPath[] }) {
  const { t } = useTranslation('tableOfContents')

  // Input an arrays with the metadata for each post and return
  // an array of the same type filtered by the selected path
  function getOnePostMetadata(posts: PostMetaPath[], path: string) {
    return posts.filter(
      ({ slug: fileSlug, folder }) => `/${folder}/${fileSlug}` === path
    )[0]
  }

  return (
    <>
      {tableOfContents.map((obj) => {
        // Put all the keys of the table of contents in an array
        const sections = Object.keys(obj)
        return (
          <React.Fragment key={JSON.stringify(sections)}>
            {sections.map((section) => {
              // Map through all the sections and use the section key string as title
              return (
                <React.Fragment key={section}>
                  <section className="flex justify-end md:justify-start">
                    <Link href={`${obj[section].more}`}>
                      <a className="mb-2 text-right md:text-left text-xl font-bold uppercase hover:underline">
                        {t(section)}
                      </a>
                    </Link>
                  </section>
                  <section className="mb-6 md:mb-12 grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Map through the array of urls for each section */}
                    {obj[section].items.map((url) => {
                      const {
                        description,
                        title,
                        folder,
                        slug: fileSlug,
                      } = getOnePostMetadata(posts, url)
                      return (
                        <MdxCard
                          key={title}
                          title={title}
                          description={description}
                          folder={folder}
                          slug={fileSlug}
                        ></MdxCard>
                      )
                    })}
                  </section>
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      })}
    </>
  )
}
