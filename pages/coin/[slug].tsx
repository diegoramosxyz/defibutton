import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getAllMdxMeta, getMdxContent } from 'utils/mdxUtils'
import { SlugMetadata, PostMetaPath } from 'interfaces'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { getPriceAnd24hr } from 'utils/coins'
import TickerPrice from 'components/TickerPrice'
import { ProtocolTvl } from 'interfaces'
import { Coin } from 'interfaces'
import { getMetadataBySlug, getSlugsFromDb } from 'utils/db'

export default function PostPage({
  source,
  slugMeta,
  sidebarMeta,
  slugDbMeta,
}: {
  source: MdxRemote.Source
  slugMeta: SlugMetadata
  sidebarMeta: PostMetaPath[]
  slugDbMeta: Coin
}) {
  const initialTickerData = {
    usd: 0,
    usd_24h_change: 0.0,
    symbol: '---',
  }

  const [tickerData, setTickerData] = useState(initialTickerData)
  const [loading, setLoading] = useState(true)

  const { title } = slugMeta
  const { geckoId, symbol, slug } = slugDbMeta

  useEffect(() => {
    setLoading(true)
    async function loadData() {
      const data = await getPriceAnd24hr(geckoId)
      setTickerData({ ...data, symbol })
    }
    loadData()
    setLoading(false)
  }, [geckoId])

  const content = hydrate(source, { components })

  return (
    <PostLayout sidebarMeta={sidebarMeta} slugMeta={slugMeta}>
      <header className="my-3">
        <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
          <Image
            width={35}
            height={35}
            src={`/logo/${slug?.toLocaleLowerCase()}.svg`}
            alt={title}
          />
          <p className="ml-2">{title}</p>
        </h1>
        {geckoId && (
          <TickerPrice price={loading ? initialTickerData : tickerData} />
        )}
      </header>
      {content}
    </PostLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // If params.slug is an array of strings or undefined, do not render the page
  if (typeof params?.slug !== 'string') {
    return {
      notFound: true,
    }
  }

  // Get the content for the current post, including its metadata
  const mdxContext = await getMdxContent(params?.slug, 'coin', locale || 'en')

  // If the mdx file is not found based on the slug from the database, return not found
  if (typeof mdxContext === 'undefined') {
    return {
      notFound: true,
    }
  }

  // Get the metadata of all MDX files. Filtered later to show sidebar.
  // TODO: Only return sidebar items
  const sidebarMeta = getAllMdxMeta(locale)

  // Get additional metadata about the current post from the database
  const slugDbMeta = await getMetadataBySlug('coins', params?.slug)

  // const res = await fetch(
  //   `https://api.defillama.com/protocol/${MdxContext?.metadata.llama_id}`
  // )
  // const protocolTvl: ProtocolTvl = await res.json()

  const translations = await serverSideTranslations(locale || 'en', [
    'index',
    'tags',
  ])

  return {
    props: {
      source: mdxContext.source,
      slugMeta: {
        ...mdxContext.metadata,
        tags: slugDbMeta.tags,
      },
      ...translations,
      sidebarMeta,
      slugDbMeta,
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  // Get an array of slugs (strings) from the database
  const slugs = (await getSlugsFromDb('coins')) || []

  // Format the paths array to satisfy Next.js requirements
  const paths = locales
    .map((locale) => slugs.map((slug) => ({ params: { slug }, locale })))
    .flat()

  return {
    paths,
    fallback: false,
  }
}
