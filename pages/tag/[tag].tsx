import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPostsMetadata } from 'utils/mdxUtils'
import tableOfContents from 'tableOfContents'
import { PostMetaPath } from 'interfaces'
import Layout from 'components/Layout'
import React from 'react'
import MdxCard from 'components/MdxCard'
import { useTranslation } from 'react-i18next'

export default function Tag({
  filteredPosts,
  tag,
}: {
  filteredPosts: PostMetaPath[]
  tag: string
}) {
  const { t } = useTranslation('tags')
  return (
    <Layout head={`${t(tag)} - DeFi Button`}>
      <header>
        <h1 className="text-xl font-semibold mb-3 capitalize">{t(tag)}</h1>
      </header>
      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mb-5">
        <pre>
          <code>{JSON.stringify(filteredPosts, null, 2)}</code>
        </pre>
        {/* {coinTags.map((test) => (
          <MdxCard
            key={title}
            title={title}
            description={description}
            folder={folder}
            fileSlug={fileSlug}
            sidebar={false}
          ></MdxCard>
        ))} */}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  const allMeta = [...postsMeta, ...coinsMeta]

  return {
    props: {
      tag: params?.tag,
      filteredPosts: [],
      ...(await serverSideTranslations(locale || 'en', ['tags'])),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Extract the keys from the table of contents array and create an array of the type
  // {
  //   params: {
  //       tag: string;
  //   };
  // }[]
  const paths = tableOfContents
    .map((obj) => Object.keys(obj).map((tag) => ({ params: { tag: tag } })))
    .flat()

  return {
    paths,
    fallback: true, // Fallback true because only the tags from the table
    // of contents will be generated at build time
  }
}
