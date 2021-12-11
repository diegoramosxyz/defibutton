import Link from 'next/link'
import SelectLanguage from './SelectLanguage'
import { useTranslation } from 'next-i18next'

export default function Nav() {
  const { t } = useTranslation('common')
  return (
    <nav className="md:rounded-b-md text-base print:hidden z-10 px-4 py-2.5 fixed md:static bottom-0 w-full bg-neutral-50 dark:bg-neutral-900 border-t md:border-t-0 md:border-0 border-neutral-200 dark:border-neutral-800">
      <section className="flex items-center justify-between">
        {/* <input 
          type="search"
          name="search"
          aria-label="search"
          placeholder="🔎 Search"
          className="rounded-md font-semibold px-3 py-1 bg-transparent transition ring-1 ring-current focus:outline-none focus:ring-1 focus:ring-blue-700 dark:focus:ring-blue-400"
        /> */}
        <Link href="/">
          <a className="md:text-xl font-bold">DeFi Button</a>
        </Link>
        <section className="flex items-center space-x-5">
          <Link href="/projects">
            <a className="hover:underline">{t('projects')}</a>
          </Link>
          <Link href="/blog">
            <a className="hover:underline">{t('posts')}</a>
          </Link>
          <SelectLanguage />
        </section>
      </section>
    </nav>
  )
}
