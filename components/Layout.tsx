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
    <main className="px-2 md:px-4 lg:px-5 my-3 max-w-screen-xl mx-auto">
      <Head>
        <title>{head}</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}
