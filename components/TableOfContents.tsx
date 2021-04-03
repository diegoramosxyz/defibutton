import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { PostMetaPath } from 'interfaces'
import tableOfContents from 'tableOfContents'
import MdxCard from './MdxCard'

export default function TableOfContents({
  posts,
  sidebar,
}: {
  posts: PostMetaPath[]
  sidebar: boolean
}) {
  const { t } = useTranslation('index')

  // Input an arrays with the metadata for each post and return
  // an array of the same type filtered by the selected path
  function getOnePostMetadata(posts: PostMetaPath[], path: string) {
    return posts.filter(
      ({ fileSlug, folder }) => `/${folder}/${fileSlug}` === path
    )[0]
  }

  return (
    <>
      {tableOfContents.map((obj) => {
        // Put all the keys of the table of contents in an array
        const sections = Object.keys(obj)
        return (
          <React.Fragment key={JSON.stringify(obj)}>
            {sections.map((section) => {
              // Map through all the sections and use the section key string as title
              return (
                <React.Fragment key={section}>
                  <Link href={`/tag/${section}`}>
                    <a
                      className={`text-xl font-bold hover:underline ${
                        sidebar ? 'mb-1 mt-2' : 'uppercase'
                      }`}
                    >
                      {t(section)}
                    </a>
                  </Link>
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
                        fileSlug,
                      } = getOnePostMetadata(posts, url)
                      return (
                        <MdxCard
                          key={title}
                          title={title}
                          description={description}
                          folder={folder}
                          fileSlug={fileSlug}
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
