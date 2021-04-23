export default function TickerPrice({
  price,
  geckoId,
}: {
  price: {
    usd: number
    usd_24h_change: number
    symbol: string
  }
  geckoId: string
}) {
  const { usd, usd_24h_change, symbol } = price

  return (
    <article className="font-bold font-mono sm:text-right">
      <section>
        <a
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://coingecko.com/coins/${geckoId}`}
        >
          {symbol.toUpperCase()}
        </a>
        : $
        {usd.toLocaleString('en-US', {
          style: 'decimal',
        })}{' '}
        USD
      </section>
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
    </article>
  )
}
