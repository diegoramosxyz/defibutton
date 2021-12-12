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
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
      </div>
      <main className="px-3 md:px-6 2xl:px-0 max-w-screen-2xl mx-auto">
        {children}
        <Footer />
      </main>
    </>
  )
}
