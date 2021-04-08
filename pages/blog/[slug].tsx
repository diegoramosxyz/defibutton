import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getSlugs, getMdxContent, getPostsMetadata } from 'utils/mdxUtils'
import { PostMetadata, PostMetaPath } from 'interfaces/index'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSlugsFromDb } from 'utils/db'

export default function PostPage({
  source,
  metadata,
  allMeta,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  allMeta: PostMetaPath[]
}) {
  if (source) {
    const { title } = metadata

    const content = hydrate(source, { components })

    return (
      <PostLayout posts={allMeta} meta={metadata}>
        <header className="my-3">
          <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
            {title}
          </h1>
        </header>
        {content}
      </PostLayout>
    )
  }
  return <div>404 Not Found</div>
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const MdxContext = await getMdxContent(params?.slug, 'blog', locale || 'en')
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  const allMeta = [...postsMeta, ...coinsMeta]

  return {
    props: {
      allMeta,
      ...MdxContext,
      ...(await serverSideTranslations(locale || 'en', ['index', 'tags'])),
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const slugs = (await getSlugsFromDb('docs')) || []
  const paths = locales
    .map((locale) => slugs.map((slug) => ({ params: { slug }, locale })))
    .flat()
  return {
    paths,
    fallback: true,
  }
}
