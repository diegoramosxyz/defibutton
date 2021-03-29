import Link from "next/link"

export default function Menu() {
  return (
    <div className="mt-7">
      <div className="max-w-screen-xl mx-auto rounded-t-md overflow-hidden">
        <section className="hidden md:grid grid-cols-6 divide-x-2 divide-gray-300 dark:divide-gray-500 border-t-2 border-l-2 border-r-2 border-gray-300 dark:border-gray-500 rounded-t-md overflow-hidden">
          <Link href="/#">
            <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              All
            </a>
          </Link>
          <Link href="/#">
            <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Lending
            </a>
          </Link>
          <Link href="/#">
            <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Dexes
            </a>
          </Link>
          <Link href="/#">
            <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Derivatives
            </a>
          </Link>
          <Link href="/#">
            <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Payments
            </a>
          </Link>
          <Link href="/#">
            <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Assets
            </a>
          </Link>
        </section>
        <section className="grid md:grid-cols-5 md:border-t-2 md:border-b-2 md:border-l-2 md:border-r-2 border-gray-300 dark:border-gray-500 rounded-t-md overflow-hidden md:rounded-none">
          <div className="md:col-span-3 border-none">
            <button className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900 underline text-blue-700 dark:text-blue-300 font-semibold">
              All
            </button>
            <button className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Hot
            </button>
            <button className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              New
            </button>
            <button className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
              Started
            </button>
          </div>
          <form className="md:col-span-2 flex text-gray-300 border-l-2 border-gray-300 dark:border-gray-500 focus-within:text-current">
            <input
              type="search"
              aria-label="Search"
              placeholder="Search"
              className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-900 font-medium focus:outline-none "
            />
          </form>
        </section>
      </div>
    </div>
  )
}
