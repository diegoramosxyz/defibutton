import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { PostMetaPath } from 'interfaces'
import MdxCard from './MdxCard'

const tableOfContents: { [key: string]: string[] }[] = [
  { cefi: ['/blog/banks'] },
  {
    defi: [
      '/coin/bitcoin',
      '/coin/ethereum',
      '/blog/defi',
      '/blog/smart-contract',
      '/blog/dex',
    ],
  },
  {
    coins: [
      '/coin/aave',
      '/coin/uniswap',
      '/coin/binance-coin',
      '/coin/chainlink',
      '/coin/compound',
      '/coin/dai',
      '/coin/sushiswap',
    ],
  },
  { tutorial: ['/blog/cefi-to-defi', '/blog/metamask'] },
  { safety: ['/blog/safety'] },
  { extra: ['/blog/glossary', '/blog/faq', '/blog/trust'] },
]

export default function TableOfContents({
  posts,
  sidebar,
}: {
  posts: PostMetaPath[]
  sidebar: boolean
}) {
  const { t } = useTranslation('tags')

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
                  <div>
                    <Link href={`/tag/${section}`}>
                      <a
                        className={`text-xl font-bold hover:underline ${
                          sidebar ? 'mb-1 mt-2' : 'uppercase'
                        }`}
                      >
                        {t(section)}
                      </a>
                    </Link>
                  </div>
                  <section
                    className={`grid ${
                      !sidebar && 'gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {/* Map through the array of urls for each section */}
                    {obj[section].map((url) => {
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
                          sidebar={sidebar}
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
