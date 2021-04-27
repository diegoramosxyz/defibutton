import { RoundBigNumber } from 'utils/numbers'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

export default function Leaderboard() {
  const { state, dispatch } = useContext(GlobalContext)

  // LOAD INITIAL DATA
  useEffect(() => {
    async function data() {
      const res = await fetch('https://api.llama.fi/protocols')
      const data = await res.json()
      dispatch({ type: 'LOAD_DATA', payload: data })
    }
    data()
  }, [])

  return (
    <section className="mb-20 table sm:px-3 md:px-0 max-w-sm sm:max-w-screen-xl mx-auto w-full">
      <header className="table-header-group">
        <div className="table-row bg-blue-100 dark:bg-blue-900 font-semibold">
          <div className="p-2 table-cell">Rank</div>
          <div className="p-2 table-cell">Logo</div>
          <div className="p-2 table-cell">Name</div>
          <div className="p-2 hidden sm:table-cell">Symbol</div>
          <div className="p-2 hidden md:table-cell">Chain</div>
          <div className="p-2 hidden md:table-cell">Category</div>
          <div className="p-2 table-cell">
            <button
              onClick={() => dispatch({ type: 'SORT_TVL' })}
              className="flex place-items-center gap-2"
            >
              TVL{state.sorted === 'ASC' ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
          <div className="p-2 hidden sm:table-cell text-center md:text-left">
            24hr %
          </div>
        </div>
      </header>
      <section className="table-row-group">
        {state.displayProtocols.map(
          (
            { name, slug, symbol, chain, tvl, change_1d, category, logo },
            idx
          ) => (
            <article key={idx} className="table-row rounded-md md:rounded-none">
              <div className="px-2 py-4 table-cell">{idx + 1}</div>
              {logo ? (
                <img
                  src={`${logo}`}
                  alt={`${symbol}`}
                  width="25px"
                  height="25px"
                />
              ) : (
                <div></div>
              )}
              <div className="px-2 py-4 table-cell">
                <Link href={`/tvl/${slug}`}>
                  <a className="truncate text-left lg:text-base">{name}</a>
                </Link>
              </div>
              <div className="px-2 py-4 hidden sm:table-cell">
                <p className="truncate text-left lg:text-base">{symbol}</p>
              </div>
              <div className="px-2 py-4 hidden md:table-cell">
                <p className="truncate">{chain}</p>
              </div>
              <div className="px-2 py-4 hidden md:table-cell">
                <p className="truncate">{category}</p>
              </div>
              <div className="px-2 py-4 table-cell">
                <p className="truncate">{RoundBigNumber(+tvl)}</p>
              </div>

              <div className="px-2 py-4 hidden sm:table-cell text-center md:text-left">
                {change_1d &&
                  (change_1d < 0 ? (
                    <p className="truncate text-red-500">
                      {change_1d.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="truncate text-green-500">
                      {change_1d.toFixed(2)}%
                    </p>
                  ))}
              </div>
            </article>
          )
        )}
      </section>
    </section>
  )
}
