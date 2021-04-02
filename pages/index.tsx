import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { getPostsMetadata } from 'utils/mdxUtils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TableOfContents from 'components/TableOfContents'
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
        <TableOfContents
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
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  const allMeta = [...postsMeta, ...coinsMeta]

  return {
    props: {
      allMeta,
      ...(await serverSideTranslations(locale || 'en', ['index'])),
    },
  }
}
