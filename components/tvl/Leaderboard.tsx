import { RoundBigNumber } from "utils/numbers"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { GlobalContext } from "context/GlobalState"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

export default function Leaderboard() {
  const { state, dispatch } = useContext(GlobalContext)

  // LOAD INITIAL DATA
  useEffect(() => {
    async function data() {
      const res = await fetch('https://api.defillama.com/protocols')
      const data = await res.json()
      dispatch({ type: "LOAD_DATA", payload: data })
    }
    data()
  }, [])

  return (
    <section className="mt-5 md:mt-0 md:table md:border-b-2 md:border-l-2 md:border-r-2 md:border-gray-300 md:dark:border-gray-500 px-3  md:px-0 max-w-sm sm:max-w-screen-xl mx-auto w-full rounded-md overflow-hidden md:rounded-t-none md:rounded-b-md">
      <header className="hidden md:table-header-group">
        <div className="table-row bg-blue-100 dark:bg-blue-900 font-semibold">
          <div className="p-2 table-cell"></div>
          <div className="p-2 table-cell"></div>
          <div className="p-2 table-cell">Name</div>
          <div className="p-2 table-cell">Symbol</div>
          <div className="p-2 table-cell">Chain</div>
          <div className="p-2 table-cell">Category</div>
          <div className="p-2 table-cell">
            <button
              onClick={() => dispatch({ type: "SORT_TVL" })}
              className="flex place-items-center gap-2"
            >
              TVL{state.sorted === "ASC" ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
          <div className="p-2 table-cell">24hr change</div>
        </div>
      </header>
      <section className="grid md:table-row-group sm:grid-cols-2 gap-4 text-center md:text-left">
        {state.protocols.map(({ name, symbol, chain, tvl, change_1d, category, logo }, idx) => (
          <article
            key={idx}
            className="grid border grid-cols-3 md:table-row rounded-md md:rounded-none"
          >
            <div className="px-2 py-4 grid col-span-full md:table-cell text-left">
              {idx + 1}
            </div>
            {logo ? <img
              src={`${logo}`}
              alt={`${symbol}`}
              width="25px"
              height="25px"
            /> : <div></div>}
            <div className="px-2 py-4 grid col-span-full md:table-cell text-left">
              <header className="md:hidden text-sm">Name</header>
              <Link href={`/tvl/${name}`}>
                <a className="truncate text-left lg:text-base">{name}</a>
              </Link>
            </div>
            <div className="px-2 py-4 grid col-span-full md:table-cell text-left">
              <header className="md:hidden text-sm">Symbol</header>
              <p className="truncate text-left lg:text-base">{symbol}</p>
            </div>
            <div className="px-2 py-4 table-cell">
              <header className="md:hidden text-sm">Chain</header>
              <p className="truncate">{chain}</p>
            </div>
            <div className="px-2 py-4 table-cell">
              <header className="md:hidden text-sm">Category</header>
              <p className="truncate">{category}</p>
            </div>
            <div className="px-2 py-4 table-cell">
              <header className="md:hidden text-sm">TVL</header>
              <p className="truncate">{RoundBigNumber(+tvl)}</p>
            </div>

            <div className="px-2 py-4 table-cell">
              <header className="md:hidden text-sm">24H Change</header>
              {change_1d < 0 ? (
                <p className="truncate text-red-500">{change_1d.toFixed(2)}%</p>
              ) : (
                <p className="truncate text-green-500">
                  {change_1d.toFixed(2)}%
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}
