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
import { ProtocolTvl } from 'interfaces/data-types'

export default function PostPage({
  source,
  metadata,
  posts,
  protocolTvl,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  posts: any
  protocolTvl: ProtocolTvl
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
    const { description, title, lastEdit, ticker, gecko_id } = metadata

    useEffect(() => {
      setLoading(true)
      async function loadData() {
        if (ticker && gecko_id) {
          const data = await getPriceAnd24hr(gecko_id, ticker)
          setTickerData(data)
        }
      }
      loadData()
      setLoading(false)
    }, [gecko_id])

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
              <p className="ml-2">{title}</p>
            </h1>
          ) : (
            <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
              {title}
            </h1>
          )}
          {/* {description && <p>{description}</p>} */}
          {gecko_id && loading && <TickerPrice price={initialTickerData} />}
          {gecko_id && !loading && <TickerPrice price={tickerData} />}
        </header>
        {content}
        <pre>
          <code>{JSON.stringify(protocolTvl, null, 2)}</code>
        </pre>
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

  const res = await fetch(
    `https://api.defillama.com/protocol/${MdxContext.metadata.llama_id}`
  )
  const protocolTvl: ProtocolTvl = await res.json()

  return {
    props: {
      posts,
      ...MdxContext,
      ...translations,
      protocolTvl,
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
