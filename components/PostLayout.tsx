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
  customHeader,
}: {
  children: React.ReactNode
  metadata: SlugMetadata
  tags: string[] | undefined
  customHeader?: React.ReactNode
}) {
  const { t } = useTranslation(['common', 'tags'])
  const { title, lastModified } = metadata
  return (
    <>
      <Head>
        <title>{title} - DeFi Button</title>
      </Head>
      {/* Adjust max-width by changing text size */}
      {/* https://developer.mozilla.org/en-US/docs/Web/CSS/length#units */}
      <div className="max-w-prose mx-auto lg:text-lg xl:text-xl 2xl:text-2xl ">
        <Nav />
      </div>
      <main className="px-4 md:px-0 py-10 sm:py-12 lg:py-16 prose dark:prose-invert prose-neutral lg:prose-lg xl:lg:prose-xl 2xl:lg:prose-2xl mx-auto print:bg-white print:text-black">
        {customHeader}
        {children}
        <section className="flex justify-between items-center align-center opacity-75 my-5 lg:my-12 gap-2">
          <LastEdit translation={t('lastEdit')} lastModified={lastModified} />
          <div className="grid sm:flex space-y-4 sm:space-y-0 sm:space-x-3 print:hidden">
            {tags?.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a>#{t(tag)}</a>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
