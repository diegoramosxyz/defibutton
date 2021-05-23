import React from 'react'
import { GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import PostLayout from 'components/PostLayout'
import { getMdxContent, getSlugs } from 'utils/mdxUtils'
import { SlugMetadata } from 'interfaces'
import docs from 'data/docs'
import { components } from 'components/MdxProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function PostPage({
  source,
  metadata,
  tags,
}: {
  source: MdxRemote.Source
  metadata: SlugMetadata
  tags: string[]
}) {
  const { title } = metadata

  const content = hydrate(source, { components })

  return (
    <PostLayout tags={tags} metadata={metadata}>
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
  // If params.slug is an array of strings or undefined, do not render the page
  if (typeof params?.slug !== 'string') {
    return {
      notFound: true,
    }
  }

  // Get the content for the current post, including its metadata
  const mdxContext = await getMdxContent(params?.slug, 'blog', locale || 'en')

  // If the mdx file is not found based on the slug from the database, return not found
  if (typeof mdxContext === 'undefined') {
    return {
      notFound: true,
    }
  }

  // Get additional metadata about the current post from the database
  const docMeta = docs.find(doc => doc.slug === params.slug)

  const translations = await serverSideTranslations(locale || 'en', [
    'common',
    'tags',
  ])

  return {
    props: {
      ...mdxContext,
      tags: !!docMeta?.tags ? docMeta.tags : [],
      ...translations,
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const paths = locales.map((locale) => getSlugs('blog', locale)).flat()
  return {
    paths,
    fallback: false,
  }
}
