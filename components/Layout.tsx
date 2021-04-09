import Footer from './Footer'
import React from 'react'
import Head from 'next/head'
import SelectLanguage from './SelectLanguage'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({
  children,
  head,
}: {
  children: React.ReactNode
  head: string
}) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{head}</title>
      </Head>
      <div className="min-h-screen px-2 sm:px-4 lg:px-0 pb-14">
        <nav className="flex items-center justify-between mb-3 px-4 py-2.5 w-full border-t sm:border-b sm:border-t-0 border-trueGray-200 dark:border-trueGray-800 bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200">
          <Link href="/">
            <a className="text-xl font-bold">DeFi Button</a>
          </Link>
          <section className="flex items-center space-x-5">
            {router.asPath === '/' && (
              <Link href="/tvl">
                <a className="font-bold underline">TVL</a>
              </Link>
            )}
            <SelectLanguage />
          </section>
        </nav>
        <main className="px-2 xl:px-0 max-w-screen-lg mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
