import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { getPostsMetadata } from 'utils/mdxUtils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentSection from 'components/ContentSection'
import { useTranslation } from 'next-i18next'

// TODO: ADD TYPE
export default function Index({ posts }: { posts: any }) {
  const { t } = useTranslation('index')
  return (
    <Layout head="DeFi Button">
      <section className="text-center font-medium mb-4">
        {t('intro')}
      </section>
      <section className="grid gap-4 mb-5">
        <ContentSection
          tags={['fundamentals', 'defi', 'tutorials', 'tips', 'extra']}
          sidebar={false}
          posts={posts}
        />
      </section>
      <section className="opacity-80 text-sm text-center mb-5">
        {t('warning')}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = getPostsMetadata(locale)

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale || 'en', ['index'])),
    },
  }
}
