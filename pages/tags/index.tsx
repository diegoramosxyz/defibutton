import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { tags } from 'data/tags'

export default function Tag() {
  const { t } = useTranslation('tags')

  return (
    <Layout head={`Tags - DeFi Button`}>
      <header>
        <h1 className="text-xl font-semibold mb-3 capitalize">Tags</h1>
      </header>
      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mb-5">
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <a>{t(tag)}</a>
          </Link>
        ))}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['tags'])

  return {
    props: {
      ...translations,
    },
  }
}
