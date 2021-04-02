import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { PostMetaPath } from 'interfaces'

const tableOfContents = ['fundamentals', 'defi', 'tutorials', 'tips', 'extra']

export default function TableOfContents({
  posts,
  sidebar,
}: {
  posts: PostMetaPath[]
  sidebar: boolean
}) {
  const { t } = useTranslation('index')

  // Input an arrays with the metadata for each post and return 
  // an array of the same type filtered by the selected tag
  function filterByTag(posts: PostMetaPath[], tag: string) {
    return posts.filter(
      (post) => !!post.tags.find((item: string) => item === tag)
    )
  }

  return (
    <>
      {tableOfContents.map((tag) => {
        const metadata = filterByTag(posts, tag)
        return (
          <div key={tag}>
            <h1 className={`text-xl font-bold ${sidebar ? 'mb-1 mt-2' : 'mb-2 uppercase'}`}>
              {t(tag)}
            </h1>
            <section className={`grid ${!sidebar && 'gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {metadata.map((post) => {
                const { description, title, folder, filePath } = post
                return (
                  <Link
                    key={filePath}
                    href={`/${folder}/${filePath.replace(/\.mdx?$/, '')}`}
                  >
                    <a
                      className={`block transition h-full rounded-sm border-trueGray-200 dark:border-trueGray-800 focus:ring focus:ring-lightBlue-300 dark:focus:ring-lightBlue-800 focus:outline-none focus:border-lightBlue-300 dark:focus:border-lightBlue-800 hover:border-lightBlue-300 dark:hover:border-lightBlue-800 ${sidebar
                        ? 'border-b px-2 py-3 lg:py-2'
                        : 'border px-4 py-3'
                        }`}
                    >
                      {folder === 'coins' ? (
                        <header className="flex gap-1 items-center font-semibold">
                          <Image
                            width={20}
                            height={20}
                            src={`/logo/${filePath.replace(/\.mdx?$/, '')}.svg`}
                            alt={title}
                          />
                          <span className="ml-1">{title}</span>
                        </header>
                      ) : (
                        <header className="font-semibold">{title}</header>
                      )}
                      {!sidebar && (
                        <p className="opacity-70 text-sm">{description}</p>
                      )}
                    </a>
                  </Link>
                )
              })}
            </section>
          </div>
        )
      })}
    </>
  )
}
