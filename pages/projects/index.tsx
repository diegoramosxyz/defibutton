import React from 'react'
import { GetStaticProps } from 'next'
import { getMdxContent, postFileSlugs } from 'utils/mdxUtils'
import { SlugMetadata } from 'interfaces'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import MdxCard from 'components/MdxCard'

export default function index({ metadata }: { metadata: SlugMetadata[] }) {
  return (
    <Layout head="Projects">
      <h1 className="text-xl font-semibold mb-3">DeFi Projects</h1>
      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metadata
          .map(({ title, description, slug }) => {
            if (!!title) {
              return (
                <MdxCard
                  key={title}
                  title={title}
                  description={description}
                  folder="projects"
                  slug={slug || ''}
                ></MdxCard>
              )
            }
            return null
          })
          // filter out null values
          .filter((item) => !!item)}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Only the paths from the default locale are needed
  // returns: ['slug', 'another-slug']
  const slugs = postFileSlugs('projects', locale || 'en')

  const metadata = await Promise.all(
    slugs
      .map(async (slug) => {
        const content = await getMdxContent(slug, 'projects', locale || 'en')
        return {
          slug,
          ...content?.metadata,
        }
      })
      // Remove undefined values from the array
      .filter((item) => !!item)
  )

  const translations = await serverSideTranslations(locale || 'en', [
    'common',
    'tags',
  ])

  return {
    props: {
      metadata,
      ...translations,
    },
  }
}
