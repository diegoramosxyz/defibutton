import Link from 'next/link'
import SelectLanguage from './SelectLanguage'

export default function Nav() {
  return (
    <nav className="z-10 px-4 py-2.5 fixed md:static bottom-0 w-full bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200 border-t md:border-t-0 md:border-b border-trueGray-200 dark:border-trueGray-800">
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
            <a className="hover:underline">Projects</a>
          </Link>
          <Link href="/blog">
            <a className="hover:underline">Posts</a>
          </Link>
          <SelectLanguage />
        </section>
      </section>
    </nav>
  )
}
