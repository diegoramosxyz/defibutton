import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getMdxContent, getSlugs } from 'utils/mdxUtils'
import { SlugMetadata } from 'interfaces'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { getPriceAnd24hr } from 'utils/coins'
import TickerPrice from 'components/TickerPrice'
import { ProtocolTvl } from 'interfaces'
import { Coin } from 'interfaces'
import { getMetadataBySlug } from 'utils/db'

export default function PostPage({
  source,
  slugMeta,
  slugDbMeta,
}: {
  source: MdxRemote.Source
  slugMeta: SlugMetadata
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
  const { geckoId, symbol, slug, website, tags } = slugDbMeta

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
    <PostLayout tags={tags} metadata={slugMeta}>
      <header className="my-3">
        <div className="grid gap-2 sm:gap-0 sm:grid-cols-2 items-start justify-between lg:pt-5 ">
          <h1 className="flex items-center text-4xl font-bold">
            <Image
              width={35}
              height={35}
              src={`/logo/${slug?.toLocaleLowerCase()}.svg`}
              alt={title}
            />
            <p className="ml-2">{title}</p>
          </h1>

          {geckoId && (
            <TickerPrice
              geckoId={geckoId}
              price={loading ? initialTickerData : tickerData}
            />
          )}
          <a
            className="font-mono"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://${website}`}
          >
            🌐 {website}
          </a>
        </div>
      </header>
      <hr className="mb-2 border-trueGray-200 dark:border-trueGray-800" />
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

  // Get additional metadata about the current post from the database
  const slugDbMeta = await getMetadataBySlug('coins', params?.slug)

  // const res = await fetch(
  //   `https://api.defillama.com/protocol/${MdxContext?.metadata.llama_id}`
  // )
  // const protocolTvl: ProtocolTvl = await res.json()

  const translations = await serverSideTranslations(locale || 'en', [
    'common',
    'tags',
  ])

  return {
    props: {
      source: mdxContext.source,
      slugMeta: {
        ...mdxContext.metadata,
        tags: !!slugDbMeta ? slugDbMeta.tags : [],
      },
      ...translations,
      slugDbMeta,
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const paths = locales.map((locale) => getSlugs('coin', locale)).flat()
  return {
    paths,
    fallback: false,
  }
}
