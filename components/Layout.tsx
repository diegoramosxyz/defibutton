import Footer from './Footer'
import React from 'react'
import Head from 'next/head'
import { GlobalContext } from 'context/GlobalState'
import SelectLanguage from './SelectLanguage'

export default function PostLayout({
  children,
  head,
}: {
  children: React.ReactNode
  head: string
}) {
  const { dispatch } = React.useContext(GlobalContext)
  // reset modal state
  React.useEffect(() => {
    dispatch({ type: 'MODAL', payload: '_OFF_' })
  }, [])
  return (
    <>
      <Head>
        <title>{head}</title>
      </Head>
      <div className="min-h-screen text-lg px-2 sm:px-4 lg:px-0 pb-14">
        <nav className="flex items-center justify-between mb-3 px-4 py-2.5 w-full border-t sm:border-b sm:border-t-0 border-trueGray-200 dark:border-trueGray-800 bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200">
          <p className="text-xl font-bold">DeFi Button</p>
          <div className="w-36">
            <SelectLanguage />
          </div>
        </nav>
        <main className="px-2 xl:px-0 max-w-screen-lg mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
