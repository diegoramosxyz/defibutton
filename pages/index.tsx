import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import { getAllMdxMeta } from 'utils/mdxUtils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TableOfContents from 'components/TableOfContents'
import { useTranslation } from 'next-i18next'
import { PostMetaPath } from 'interfaces'

export default function Index({
  sidebarMeta,
}: {
  sidebarMeta: PostMetaPath[]
}) {
  const { t } = useTranslation('index')
  return (
    <Layout head="DeFi Button">
      <section className="text-center font-medium mb-4">{t('intro')}</section>
      <section className="grid gap-4 mb-5">
        <TableOfContents sidebar={false} posts={sidebarMeta} />
      </section>
      <section className="opacity-80 text-sm text-center mb-5">
        {t('warning')}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Get the metadata of all MDX files. Filtered later to show sidebar.
  const sidebarMeta = getAllMdxMeta(locale)

  const translations = await serverSideTranslations(locale || 'en', [
    'index',
    'tags',
  ])

  return {
    props: {
      sidebarMeta,
      ...translations,
    },
  }
}
