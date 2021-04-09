import React from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getAllMdxMeta, getMdxContent } from 'utils/mdxUtils'
import { SlugMetadata, PostMetaPath } from 'interfaces/index'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getMetadataBySlug, getSlugsFromDb } from 'utils/db'

export default function PostPage({
  source,
  slugMeta,
  sidebarMeta,
}: {
  source: MdxRemote.Source
  slugMeta: SlugMetadata
  sidebarMeta: PostMetaPath[]
}) {
  const { title } = slugMeta

  const content = hydrate(source, { components })

  return (
    <PostLayout sidebarMeta={sidebarMeta} slugMeta={slugMeta}>
      <header className="my-3">
        <h1 className="flex items-center text-4xl pb-3 pt-2 lg:pt-5 font-bold">
          {title}
        </h1>
      </header>
      {content}
    </PostLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // Get the content for the current post, including its metadata
  const mdxContext = await getMdxContent(params?.slug, 'blog', locale || 'en')

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
  const slugDbMeta = await getMetadataBySlug('docs', params?.slug)

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
