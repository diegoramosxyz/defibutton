import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { getAllMdxMeta } from 'utils/mdxUtils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TableOfContents from 'components/TableOfContents'
import { useTranslation } from 'next-i18next'
import { PostMetaPath } from 'interfaces'
import Newsletter from 'components/Newsletter'

export default function Index({ metadata }: { metadata: PostMetaPath[] }) {
  const { t } = useTranslation('common')
  return (
    <Layout head="DeFi Button">
      <section className="text-center font-medium mb-4 md:mb-10">
        {t('intro')}
      </section>
      <section className="grid mb-5">
        <TableOfContents posts={metadata} />
      </section>
      <Newsletter />
      <section className="opacity-80 text-sm text-center">
        {t('warning')}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Get the metadata of all MDX files. Filtered later to show sidebar.
  const metadata = getAllMdxMeta(locale)

  const translations = await serverSideTranslations(locale || 'en', [
    'common',
    'tableOfContents',
  ])

  return {
    props: {
      metadata,
      ...translations,
    },
  }
}
