import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getSlugs, getMdxContent, getPostsMetadata } from 'utils/mdxUtils'
import { PostMetadata, PostMetaPath } from 'interfaces/index'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function PostPage({
  source,
  metadata,
  allMeta,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  allMeta: PostMetaPath[]
}) {
  const { t } = useTranslation('index')
  const router = useRouter()
  if (source) {
    const { title, lastEdit } = metadata

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
      <PostLayout head={`${title} - DeFi Button`} posts={allMeta}>
        <header className="my-3">
          <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
            {title}
          </h1>
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
  return <div>404 Not Found</div>
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const translations = await serverSideTranslations(locale || 'en', [
    'index',
    'sidebar',
  ])
  const MdxContext = await getMdxContent(params?.slug, 'posts', locale || 'en')
  const postsMeta = getPostsMetadata('posts', locale || 'en')
  const coinsMeta = getPostsMetadata('coins', locale || 'en')

  const allMeta = [...postsMeta, ...coinsMeta]

  return {
    props: {
      allMeta,
      ...MdxContext,
      ...translations,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = locales?.map((locale) => getSlugs('posts', locale)).flat() || []
  return {
    paths,
    fallback: true,
  }
}
