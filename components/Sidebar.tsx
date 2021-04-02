import React from 'react'
import SelectLanguage from './SelectLanguage'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import ContentSection from './TableOfContents'
import { PostMetaPath } from 'interfaces'
import Link from 'next/link'

export default function Sidebar({ posts }: { posts: PostMetaPath[] }) {
  return <nav className="z-20 lg:z-0 fixed h-screen pb-5 right-0 top-0 lg:right-auto lg:left-0 lg:w-[240px] overflow-auto bg-trueGray-50 dark:bg-trueGray-900 border-l lg:border-l-0 lg:border-r border-trueGray-200 dark:border-trueGray-800">
    <div className="flex items-center justify-between px-2 py-1 mb-1">
      <Link href="/">
        <a className="block text-lg font-bold px-2 py-2.5">
          DeFi Button
            </a>
      </Link>
      <div className="flex items-center space-x-3">
        <a
          href="https://twitter.com/defibutton"
          rel="noreferrer" target="_blank"
        >
          <FaTwitter className="h-7 w-7" />
          <span className="sr-only">Twitter</span>
        </a>
        <a
          href="https://discord.gg/zneGzEVdJN"
          rel="noreferrer" target="_blank"
        >
          <FaDiscord className="h-7 w-7" />
          <span className="sr-only">Discord</span>
        </a>
      </div>
    </div>
    <div className="px-2 mb-2">
      <SelectLanguage />
    </div>
    <div className="grid gap-1 mb-5 px-2">
      <ContentSection
        sidebar
        posts={posts}
      />
    </div>
  </nav>
}
