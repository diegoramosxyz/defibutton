import Nav from './Navbar'
import React from 'react'
import Head from 'next/head'
import { SlugMetadata } from 'interfaces'
import LastEdit from './LastEdit'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function PostLayout({
  children,
  metadata,
  tags,
}: {
  children: React.ReactNode
  metadata: SlugMetadata
  tags: string[] | undefined
}) {
  const { t } = useTranslation(['common', 'tags'])
  const { title, lastModified } = metadata
  return (
    <>
      <Head>
        <title>{title} - DeFi Button</title>
      </Head>
      <Nav />
      <div className="text-lg px-2 sm:px-4 pb-14">
        <main className="px-2 max-w-screen-md mx-auto">
          {children}
          <section className="flex justify-between items-center text-sm align-center opacity-75 my-5 gap-2">
            <LastEdit translation={t('lastEdit')} lastModified={lastModified} />
            <div className="grid sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
              {tags?.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
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
