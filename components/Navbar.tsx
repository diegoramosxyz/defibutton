import Link from 'next/link'
import { FaDiscord, FaTwitter } from 'react-icons/fa'

export default function Nav() {
  return (
    <nav className="z-10 px-4 py-2.5 lg:hidden fixed bottom-0 w-full border-t-2 border-trueGray-200 dark:border-trueGray-800 bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200">
      <section className="flex items-center justify-between">
        {/* <input
          type="search"
          name="search"
          aria-label="search"
          placeholder="🔎 Search"
          className="rounded-md font-semibold px-3 py-1 bg-transparent transition ring-1 ring-current focus:outline-none focus:ring-1 focus:ring-blue-700 dark:focus:ring-blue-400"
        /> */}
        <div className="flex items-center space-x-5">
          <a
            href="https://twitter.com/defibutton"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="h-7 w-7" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://discord.gg/zneGzEVdJN"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="h-7 w-7" />
            <span className="sr-only">Discord</span>
          </a>
        </div>
        <Link href="/">
          <a className="text-xl font-bold">Menu</a>
        </Link>
      </section>
    </nav>
  )
}
