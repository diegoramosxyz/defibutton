import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getMdxContent, getPostsMetadata } from 'utils/mdxUtils'
import { PostMetadata, PostMetaPath } from 'interfaces/index'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { getPriceAnd24hr } from 'utils/coins'
import TickerPrice from 'components/TickerPrice'
import { ProtocolTvl } from 'interfaces/data-types'
import { Coin } from 'interfaces/data-types'
import { getMetadataBySlug, getSlugsFromDb } from 'utils/db'

export default function PostPage({
  source,
  metadata,
  posts,
  // protocolTvl,
  dbMeta,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  posts: PostMetaPath[]
  // protocolTvl: ProtocolTvl
  dbMeta: Coin
}) {
  if (source) {
    const initialTickerData = {
      usd: 0,
      usd_24h_change: 0.0,
      symbol: '---',
    }
    const [tickerData, setTickerData] = useState(initialTickerData)
    const [loading, setLoading] = useState(true)
    const { title } = metadata
    const { geckoId, symbol, slug, tags } = dbMeta

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
      <PostLayout posts={posts} meta={{ ...metadata, tags }}>
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
  return <div>404 Not Found</div>
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // Get the content for the post
  const MdxContext = await getMdxContent(params?.slug, 'coin', locale || 'en')

  // Get the metadata for the sidebar
  const meta1 = getPostsMetadata('blog', locale || 'en')
  const meta2 = getPostsMetadata('coin', locale || 'en')
  const posts = [...meta1, ...meta2]

  // Get the metadata for the slug
  const dbMeta = await getMetadataBySlug('coins', params?.slug)

  // const res = await fetch(
  //   `https://api.defillama.com/protocol/${MdxContext?.metadata.llama_id}`
  // )
  // const protocolTvl: ProtocolTvl = await res.json()

  return {
    props: {
      posts,
      ...MdxContext,
      ...(await serverSideTranslations(locale || 'en', ['index', 'tags'])),
      // protocolTvl,
      dbMeta: JSON.parse(JSON.stringify(dbMeta)),
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
    fallback: true,
  }
}
