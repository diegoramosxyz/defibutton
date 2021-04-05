import Nav from './Navbar'
import Sidebar from './Sidebar'
import React from 'react'
import Head from 'next/head'
import { PostMetadata, PostMetaPath } from 'interfaces'
import LastEdit from './LastEdit'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function PostLayout({
  children,
  posts,
  meta,
}: {
  children: React.ReactNode
  posts: PostMetaPath[]
  meta: PostMetadata
}) {
  const { t } = useTranslation(['index', 'tags'])
  const { title, tags, lastModified } = meta
  return (
    <>
      <Head>
        <title>{title} - DeFi Button</title>
      </Head>
      <Sidebar posts={posts} />
      <Nav />
      <div className="min-h-screen text-lg px-2 sm:px-4 pb-14 xl:px-0 lg:pl-64 xl:pl-0">
        <main className="px-2 xl:px-0 max-w-screen-md mx-auto">
          {children}
          <section className="flex justify-between items-center text-sm align-center opacity-75 my-5">
            <LastEdit translation={t('lastEdit')} lastModified={lastModified} />
            <div className="flex space-x-3">
              {tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <a>#{t(tag)}</a>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
