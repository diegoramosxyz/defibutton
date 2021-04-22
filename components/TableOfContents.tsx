import { useTranslation } from 'next-i18next'
import React from 'react'
import { PostMetaPath } from 'interfaces'
import MdxCard from './MdxCard'

const tableOfContents: { [key: string]: string[] }[] = [
  {
    'start-here': [
      '/blog/common-beginner-questions',
      '/blog/defi',
      '/blog/smart-contract',
      '/blog/dex',
    ],
  },
  {
    'defi-projects': [
      '/coin/bitcoin',
      '/coin/ethereum',
      '/coin/uniswap',
      '/coin/aave',
      '/coin/binance-coin',
      '/coin/sushiswap',
    ],
  },
  { 'the-old-financial-system': ['/blog/banks'] },
  { tutorials: ['/blog/cefi-to-defi', '/blog/metamask'] },
  { safety: ['/blog/safety'] },
  { others: ['/blog/glossary', '/blog/faq', '/blog/trust'] },
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
                  <h2 className="text-xl font-bold uppercase">{t(section)}</h2>
                  <section className="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
