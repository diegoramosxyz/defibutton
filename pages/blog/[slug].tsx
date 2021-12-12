import React from 'react'
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import PostLayout from 'components/PostLayout'
import { getMdxContent, getSlugs } from 'utils/mdxUtils'
import { SlugMetadata } from 'interfaces'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import blog from 'data/blog'

export default function PostPage({
  source,
  metadata,
  tags,
}: {
  source: any
  metadata: SlugMetadata
  tags: string[]
}) {
  const { title } = metadata

  return (
    <PostLayout tags={tags} metadata={metadata}>
      <h1>{title}</h1>
      <MDXRemote {...source} />
    </PostLayout>
  )
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  const paths = locales.map((locale) => getSlugs(locale, '/blog/')).flat()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // If params.slug is an array of strings or undefined, do not render the page
  if (typeof params?.slug !== 'string') {
    return {
      notFound: true,
    }
  }

  // Get the content for the current post, including its metadata
  const mdxContext = await getMdxContent(`/blog/${params?.slug}`, locale || 'en')

  // If the mdx file is not found based on the slug from the database, return not found
  if (typeof mdxContext === 'undefined') {
    return {
      notFound: true,
    }
  }

  // Get additional metadata about the current post from the database
  const docMeta = blog.find((blog) => blog.slug === `/blog/${params.slug}`)

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
