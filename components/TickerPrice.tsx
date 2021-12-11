import Link from 'next/link'

export default function TickerPrice({
  price,
  geckoId,
  llamaId,
}: {
  price: {
    usd: number
    tvl: any[]
    usd_24h_change: number
    symbol: string
  }
  geckoId: string
  llamaId: string | undefined
}) {
  const { usd, tvl, usd_24h_change, symbol } = price

  return (
    <article className="sm:text-right">
      {/* Current value */}
      <section>
        <a
          className="underline uppercase"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://coingecko.com/coins/${geckoId}`}
        >
          {symbol}
        </a>
        : $
        {usd.toLocaleString('en-US', {
          style: 'decimal',
        })}{' '}
        USD
      </section>

      {/* 24 hour change */}
      <section>
        {usd_24h_change > 0 ? (
          <span className="text-green-500 dark:text-green-400">
            +{usd_24h_change.toFixed(2)}%
          </span>
        ) : (
          <span className="text-red-500 dark:text-red-400">
            {usd_24h_change.toFixed(2)}%
          </span>
        )}{' '}
        24h
      </section>

      {/* TVL */}
      {tvl.length > 0 ? (
        <section>
          <span>
            <Link href={`/tvl/${llamaId}`}>
              <a className="underline" rel="noopener noreferrer">
                TVL
              </a>
            </Link>
            : $
          </span>
          <span>
            {/* TODO: adjust conversion for other than billions */}
            {(+tvl[tvl.length - 1].totalLiquidityUSD / 1.0e9).toFixed(2)}B USD
          </span>
        </section>
      ) : (
        <section>TVL: N/A</section>
      )}
    </article>
  )
}
