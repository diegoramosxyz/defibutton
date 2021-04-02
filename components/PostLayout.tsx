import Nav from './Navbar'
import Sidebar from './Sidebar'
import React from 'react'
import Head from 'next/head'
import { GlobalContext } from 'context/GlobalState'
import { PostMetaPath } from 'interfaces'

export default function PostLayout({
  children,
  head,
  posts,
}: {
  children: React.ReactNode
  head: string
  posts: PostMetaPath[]
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
      <Sidebar posts={posts} />
      <Nav />
      <div className="min-h-screen text-lg px-2 sm:px-4 pb-14 xl:px-0 lg:pl-64 xl:pl-0">
        <main className="px-2 xl:px-0 max-w-screen-md mx-auto">{children}</main>
      </div>
    </>
  )
}
