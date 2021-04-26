import Footer from './Footer'
import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({
  children,
  head,
}: {
  children: React.ReactNode
  head: string
}) {
  return (
    <>
      <Head>
        <title>{head}</title>
      </Head>
      <Navbar />
      <div className="mt-4 px-2 sm:px-4 lg:px-0 pb-14">
        <main className="px-2 xl:px-0 mb-7 max-w-screen-lg mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
