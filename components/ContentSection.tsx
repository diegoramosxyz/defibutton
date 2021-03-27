import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'

export default function ContentSection({
  tags,
  posts,
  sidebar,
}: {
  tags: string[]
  posts: any
  sidebar: boolean
}) {
  const { t } = useTranslation('index')

  function filterByTag(posts: any, tag: string) {
    return posts.filter(
      // TODO: ADD TYPE
      (post: any) => !!post.data.tags.find((value: string) => value === tag)
    )
  }

  return (
    <>
      {tags.map((tag) => {
        const data = filterByTag(posts, tag)
        return (
          <section key={tag}>
            <h1
              className={`text-xl font-bold ${
                sidebar ? 'mb-1 mt-2' : 'mb-2 uppercase'
              }`}
            >
              {t(tag)}
            </h1>
            <section
              className={`grid ${
                !sidebar && 'gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              <>
                {/* TODO: ADD TYPE */}
                {data.map((post: any) => {
                  const { ticker, description, title } = post.data
                  return (
                    <Link
                      key={post.filePath}
                      href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                    >
                      <a
                        className={`block transition h-full rounded-sm border-trueGray-200 dark:border-trueGray-800 focus:ring focus:ring-lightBlue-300 dark:focus:ring-lightBlue-800 focus:outline-none focus:border-lightBlue-300 dark:focus:border-lightBlue-800 hover:border-lightBlue-300 dark:hover:border-lightBlue-800 ${
                          sidebar
                            ? 'border-b px-2 py-3 lg:py-2'
                            : 'border px-4 py-3'
                        }`}
                      >
                        {ticker ? (
                          <>
                            <header className="flex gap-1 items-center font-semibold">
                              <Image
                                width={20}
                                height={20}
                                src={`/ticker/${ticker.toLowerCase()}.svg`}
                                alt={title}
                              />
                              <span className="ml-1">{title}</span>
                            </header>
                          </>
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
              </>
            </section>
          </section>
        )
      })}
    </>
  )
}
