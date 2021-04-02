import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { getPostsMetadata } from 'utils/mdxUtils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentSection from 'components/ContentSection'
import { useTranslation } from 'next-i18next'
import { PostMetaPath } from 'interfaces'

export default function Index({ allMeta }: { allMeta: PostMetaPath[] }) {
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
          posts={allMeta}
        />
        {/* <pre><code>{JSON.stringify(allMeta, null, 2)}</code></pre> */}
      </section>
      <section className="opacity-80 text-sm text-center mb-5">
        {t('warning')}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postsMeta = getPostsMetadata('posts', locale || 'en')
  const coinsMeta = getPostsMetadata('coins', locale || 'en')

  const allMeta = [...postsMeta, ...coinsMeta]
  console.log({ allMeta })
  return {
    props: {
      allMeta,
      ...(await serverSideTranslations(locale || 'en', ['index'])),
    },
  }
}
