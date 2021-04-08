import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPostsMetadata } from 'utils/mdxUtils'
import { PostMetaPath } from 'interfaces'
import Layout from 'components/Layout'
import React from 'react'
import MdxCard from 'components/MdxCard'
import { useTranslation } from 'react-i18next'
import { getAllDistinctTags, getTagsForAll } from 'utils/db'
import { useRouter } from 'next/router'

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
        {filteredPosts.map(({ folder, title, description, slug }) => (
          <MdxCard
            key={title}
            title={title}
            description={description}
            folder={folder}
            slug={slug}
            sidebar={false}
          ></MdxCard>
        ))}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  // Get all the metadata for all MDX files
  const mdxMeta = [...postsMeta, ...coinsMeta]

  // Get all the objects from all collections that contain the tag from the database
  const dbMeta = await getTagsForAll(params?.tag)

  // Filter the MDX metadata based on the data on the database.
  const filteredPosts = dbMeta.map((obj) =>
    mdxMeta.find(({ slug }) => slug === obj?.slug)
  )

  return {
    props: {
      filteredPosts,
      ...(await serverSideTranslations(locale || 'en', ['tags'])),
    },
  }
}

export const getStaticPaths = async ({ locales }: { locales: string[] }) => {
  // Get all the distinct tags from all the collections
  const tags = (await getAllDistinctTags()) || []

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
