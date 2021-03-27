import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getSlugs, getMdxContent, getPostsMetadata } from 'utils/mdxUtils'
import { PostMetadata } from 'interfaces/index'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { getPriceAnd24hr } from 'utils/coins'
import TickerPrice from 'components/TickerPrice'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function PostPage({
  source,
  metadata,
  posts,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  posts: any
}) {
  const { t } = useTranslation('index')
  const router = useRouter()
  if (source) {
    const initialTickerData = {
      usd: 0,
      usd_24h_change: 0.0,
      ticker: '---',
    }
    const [tickerData, setTickerData] = useState(initialTickerData)
    const [loading, setLoading] = useState(true)
    const { description, title, lastEdit, ticker, coingeckoId } = metadata

    useEffect(() => {
      setLoading(true)
      async function loadData() {
        if (ticker && coingeckoId) {
          const data = await getPriceAnd24hr(coingeckoId, ticker)
          setTickerData(data)
        }
      }
      loadData()
      setLoading(false)
    }, [coingeckoId])

    const date =
      (lastEdit &&
        new Date(`${lastEdit}T00:00:00`).toLocaleDateString(router.locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })) ||
      null

    const content = hydrate(source, { components })

    return (
      <PostLayout head={`${title} - DeFi Button`} posts={posts}>
        <header className="my-3">
          {ticker ? (
            <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
              <Image
                width={35}
                height={35}
                src={`/ticker/${ticker?.toLocaleLowerCase()}.svg`}
                alt={title}
              />
              <span className="ml-2">{title}</span>
            </h1>
          ) : (
            <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
              {title}
            </h1>
          )}
          {/* {description && <p>{description}</p>} */}
          {coingeckoId && loading && <TickerPrice price={initialTickerData} />}
          {coingeckoId && !loading && <TickerPrice price={tickerData} />}
        </header>
        {content}
        {lastEdit && (
          <section className="mt-4 flex gap-3 opacity-75 text-sm">
            <time dateTime={lastEdit}>
              {t('lastEdit')}: {date}
            </time>
          </section>
        )}
      </PostLayout>
    )
  }
  return <></>
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const translations = await serverSideTranslations(locale || 'en', [
    'index',
    'sidebar',
  ])
  const MdxContext = await getMdxContent(params?.slug, locale)
  const posts = getPostsMetadata(locale)

  return {
    props: {
      posts,
      ...MdxContext,
      ...translations,
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const paths = locales?.map((locale) => getSlugs(locale)).flat()
  return {
    paths,
    fallback: true,
  }
}
