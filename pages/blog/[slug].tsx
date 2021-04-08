import React from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getMdxContent, getPostsMetadata } from 'utils/mdxUtils'
import { PostMetadata, PostMetaPath } from 'interfaces/index'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getMetadataBySlug, getSlugsFromDb } from 'utils/db'

export default function PostPage({
  source,
  metadata,
  mdxMeta,
  dbMeta,
}: {
  source: MdxRemote.Source
  metadata: PostMetadata
  mdxMeta: PostMetaPath[]
  // protocolTvl: ProtocolTvl
  dbMeta: { slug: string; tags: string[] }
}) {
  if (source) {
    const { title } = metadata

    const content = hydrate(source, { components })

    return (
      <PostLayout posts={mdxMeta} meta={{ ...metadata, tags: dbMeta.tags }}>
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
  // Get the content for the post
  const MdxContext = await getMdxContent(params?.slug, 'blog', locale || 'en')

  // Get the metadata for the sidebar
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  const mdxMeta = [...postsMeta, ...coinsMeta]

  // Get the metadata for the slug
  const dbMeta = await getMetadataBySlug('docs', params?.slug)

  return {
    props: {
      mdxMeta,
      ...MdxContext,
      ...(await serverSideTranslations(locale || 'en', ['index', 'tags'])),
      dbMeta: JSON.parse(JSON.stringify(dbMeta)),
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  // Get an array of slugs (strings) from the database
  const slugs = (await getSlugsFromDb('docs')) || []

  // Format the paths array to satisfy Next.js requirements
  const paths = locales
    .map((locale) => slugs.map((slug) => ({ params: { slug }, locale })))
    .flat()

  return {
    paths,
    fallback: false,
  }
}
