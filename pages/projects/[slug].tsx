import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import PostLayout from 'components/PostLayout'
import { getMdxContent, getSlugs } from 'utils/mdxUtils'
import { SlugMetadata } from 'interfaces'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { getPriceAnd24hr } from 'utils/coins'
import TickerPrice from 'components/TickerPrice'
import coins, { Protocol } from 'data/coins'
// import { ProtocolTvl } from 'interfaces'

export default function PostPage({
  source,
  slugMeta,
  tokenMeta,
}: {
  source: any
  slugMeta: SlugMetadata
  tokenMeta: Protocol
}) {
  const initialTickerData: {
    // TODO: IMPROVE TYPES
    usd: number
    tvl: [{ totalLiquidityUSD: number }]
    usd_24h_change: number
    symbol: string
  } = {
    usd: 0,
    tvl: [{ totalLiquidityUSD: 0 }],
    usd_24h_change: 0.0,
    symbol: '---',
  }

  const [tickerData, setTickerData] = useState(initialTickerData)
  const [loading, setLoading] = useState(true)

  const { title } = slugMeta
  const { geckoId, llamaId, symbol, slug, domain, tags } = tokenMeta

  useEffect(() => {
    setLoading(true)
    async function loadData() {
      const data = await getPriceAnd24hr(geckoId, llamaId)
      setTickerData({ ...data, symbol })
    }
    loadData()
    setLoading(false)
  }, [geckoId])

  return (
    <PostLayout tags={tags} metadata={slugMeta}>
      <header className="my-3">
        <div className="grid gap-2 sm:gap-0 sm:grid-cols-2 items-start justify-between lg:pt-5 ">
          <h1 className="flex items-center text-4xl font-bold">
            <Image
              width={35}
              height={35}
              src={`/logo/${slug}.svg`}
              alt={title}
            />
            <p className="ml-2">{title}</p>
          </h1>

          {geckoId && (
            <TickerPrice
              geckoId={geckoId}
              llamaId={llamaId}
              price={loading ? initialTickerData : tickerData}
            />
          )}
          <a
            className="font-mono"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://${domain}`}
          >
            🌐 {domain}
          </a>
        </div>
      </header>
      <hr className="mb-2 border-neutral-200 dark:border-neutral-800" />
      <MDXRemote {...source} />
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
  const mdxContext = await getMdxContent(
    params?.slug,
    'projects',
    locale || 'en'
  )

  // If the mdx file is not found based on the slug from the database, return not found
  if (typeof mdxContext === 'undefined') {
    return {
      notFound: true,
    }
  }

  // Get additional metadata about the current post from the database
  const tokenMeta = coins.find((coin) => coin.slug === params.slug)

  const translations = await serverSideTranslations(locale || 'en', [
    'common',
    'tags',
  ])

  return {
    props: {
      source: mdxContext.source,
      slugMeta: {
        ...mdxContext.metadata,
        tags: !!tokenMeta ? tokenMeta.tags : [],
      },
      ...translations,
      tokenMeta,
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const paths = locales.map((locale) => getSlugs('projects', locale)).flat()
  return {
    paths,
    fallback: false,
  }
}
