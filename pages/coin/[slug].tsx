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
import { connectToDatabase } from 'utils/mongodb'
import { getSlugsFromDb } from 'utils/db'

export default function PostPage({
  source,
  metadata,
  posts,
  // protocolTvl,
  coin,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  posts: PostMetaPath[]
  // protocolTvl: ProtocolTvl
  coin: Coin
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
    const { geckoId, symbol, slug } = coin

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
      <PostLayout posts={posts} meta={metadata}>
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
  const mongoConnection = await connectToDatabase()

  const MdxContext = await getMdxContent(params?.slug, 'coin', locale || 'en')

  // Get metadata for navigation
  const meta1 = getPostsMetadata('blog', locale || 'en')
  const meta2 = getPostsMetadata('coin', locale || 'en')
  const posts = [...meta1, ...meta2]

  // Retrieve data from MongoDB
  // THE SLUG FROM THE FILE SYSTEM MUST MATCH THE DATABASE SLUG
  // /coins/en/bitcoin.mdx in file system, slug: 'bitcoin' in DB
  const coin = await mongoConnection?.db
    .collection('coins')
    .findOne({ slug: params?.slug })

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
      coin: JSON.parse(JSON.stringify(coin)),
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const slugs = (await getSlugsFromDb('coins')) || []
  const paths = locales
    .map((locale) => slugs.map((slug) => ({ params: { slug }, locale })))
    .flat()

  return {
    paths,
    fallback: true,
  }
}
