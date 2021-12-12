import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPostsMetadata } from 'utils/mdxUtils'
import { postMetadata, PostMetaPath } from 'interfaces'
import Layout from 'components/Layout'
import React from 'react'
import MdxCard from 'components/MdxCard'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { tags } from 'data/tags'
import docs from 'data/docs'
import coins from 'data/coins'

export default function Tag({
  filteredPosts,
}: {
  filteredPosts: PostMetaPath[]
}) {
  const { t } = useTranslation('tags')
  const {
    query: { tag },
  } = useRouter()

  return (
    <Layout head={`${t(`${tag}`)} - DeFi Button`}>
      <header>
        <h1 className="text-xl font-semibold mb-3 capitalize">{t(`${tag}`)}</h1>
      </header>
      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mb-5">
        {filteredPosts.map(({ title, description, slug }) => (
          <MdxCard
            key={title}
            title={title}
            description={description}
            slug={slug}
          ></MdxCard>
        ))}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // If params.tag is a string array or undefined, do not render page
  if (typeof params?.tag !== 'string') {
    return {
      notFound: true,
    }
  }

  // Get the metadata of all MDX files.
  const AllMdxMeta = getPostsMetadata(locale || 'en')

  // Get all the objects from all collections that contain the tag from the database
  const allMeta = [...docs, ...coins]
  // @ts-ignore
  const meta = allMeta.filter(doc => doc.tags.includes(params.tag))

  // Filter the MDX metadata based on the data on the database.
  const filteredPosts = meta
    .map((doc) => AllMdxMeta.find(({ slug }) => slug === doc?.slug))
    // remove undefined value from results
    .filter((item): item is postMetadata => !!item)

  const translations = await serverSideTranslations(locale || 'en', ['tags'])

  return {
    props: {
      filteredPosts,
      ...translations,
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  // Format the paths array to satisfy Next.js requirements
  const paths = locales
    .map((locale) => tags.map((tag) => ({ params: { tag }, locale })))
    .flat()

  return {
    paths,
    // No fallback because all possible tags are generated at build time.
    fallback: false,
  }
}
