import { useContext, useState } from 'react'
import { GlobalContext } from 'context/GlobalState'

export default function Menu() {
  const { state, dispatch } = useContext(GlobalContext)
  const [query, setQuery] = useState('')

  return (
    <div className="px-2 lg:px-0 max-w-screen-xl mx-auto mb-2">
      <section className="grid gap-2 sm:flex sm:justify-between">
        <select
          className="py-2 px-1 rounded-sm transition ring-1 ring-trueGray-200 dark:ring-trueGray-800 bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200 focus:outline-none focus:ring-lightBlue-300 dark:focus:ring-lightBlue-700"
          id="locale"
          defaultValue="default"
          onChange={(e) =>
            dispatch({
              type: 'SELECT_TVL_CATEGORY',
              payload: e.target.value.replace(/^\w/, (c) => c.toUpperCase()),
            })
          }
        >
          <option value="default" disabled>
            Category
          </option>
          <option value="all">All</option>
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </select>
        <form>
          <input
            type="search"
            aria-label="Search"
            placeholder="🔍 Search by name"
            className="w-full sm:w-auto px-3 py-2 rounded-sm transition bg-transparent focus:outline-none ring-1 ring-trueGray-200 dark:ring-trueGray-800 focus:ring-lightBlue-300 dark:focus:ring-lightBlue-700"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              dispatch({ type: 'SEARCH_TVL', payload: e.target.value })
            }}
          />
        </form>
      </section>
    </div>
  )
}

const categories = [
  'assets',
  'minting',
  'lending',
  'dexes',
  'services',
  'yield',
  'payments',
  'insurance',
  'chain',
  'options',
  'layer2',
  'derivatives',
  'others',
]

function Category({ category }: { category: string }) {
  return (
    <option className="capitalize" value={category}>
      {category}
    </option>
  )
}
