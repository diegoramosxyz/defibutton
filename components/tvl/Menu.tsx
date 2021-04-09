import { useContext, useState } from 'react'
import { GlobalContext } from 'context/GlobalState'
import SelectTvlCategory from './SelectTvlCategory'
import { useRouter } from 'next/router'

export default function Menu() {
  const { dispatch } = useContext(GlobalContext)
  const [query, setQuery] = useState('')
  const router = useRouter()

  return (
    <div className="px-2 lg:px-0 max-w-screen-xl mx-auto mb-2">
      <section className="grid gap-2 sm:flex sm:justify-between">
        <div className="flex space-x-3 items-center justify-between">
          <SelectTvlCategory />
          {router.query.category && (
            <button
              className="rounded-sm text-lg md:text-base py-3 md:py-1.5 px-4 md:px-3 hover:bg-trueGray-100 hover:underline dark:hover:bg-trueGray-700 focus:outline-none transition capitalize"
              onClick={() => {
                dispatch({
                  type: 'SELECT_TVL_CATEGORY',
                  payload: 'all',
                })
                router.push({ query: {} })
              }}
            >
              Clear
            </button>
          )}
        </div>
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
