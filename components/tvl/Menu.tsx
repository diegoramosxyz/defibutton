import Link from "next/link"

export default function Menu() {
  return (
    <div className="mt-7">
      <div className="max-w-screen-xl mx-auto rounded-t-md overflow-hidden">
        <section className="hidden md:grid grid-cols-6 divide-x-2 border-t-2 border-l-2 border-r-2 border-gray-300 dark:border-gray-500 rounded-t-md overflow-hidden">
          {/* {categories.map(category => <Category category={category} />)} */}
          <select
            className="w-full py-2 px-1 rounded-sm transition ring-1 focus:ring ring-trueGray-200 dark:ring-trueGray-800 bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200 focus:outline-none focus:ring-lightBlue-300 dark:focus:ring-lightBlue-700"
            id="locale"
            defaultValue="default"
          // onChange={(e) =>
          //   router.push(router.asPath, router.asPath, {
          //     locale: e.target.value,
          //   })
          // }
          >
            <option disabled>Category</option>
            <option value="default">All</option>
            {categories.map(category => <Category2 key={category} category={category} />)}
          </select>
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

const categories = ['asset', 'minting', 'lending', 'dexes', 'services', 'yield', 'payments', 'insurance', 'chain', 'options', 'layer2', 'derivatives', 'others']

function Category({ category }: { category: string }) {
  return (
    <Link href={`/tvl/category/${category}`}>
      <a className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-900">
        {category}
      </a>
    </Link>
  )
}

function Category2({ category }: { category: string }) {
  return (
    <option className="capitalize" value={category}>{category}</option>
  )
}
