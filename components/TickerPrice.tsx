export default function TickerPrice({ price }: {
  price: {
    usd: number,
    usd_24h_change: number
    symbol: string
  },
}) {
  const { usd, usd_24h_change, symbol } = price

  return (
    <article className="font-bold font-mono">
      {symbol}: $
      {usd.toLocaleString('en-US', {
        style: 'decimal',
      })}{' '}
      USD,{' '}
      {usd_24h_change > 0 ? <span className="text-green-500 dark:text-green-400">
        +{usd_24h_change.toFixed(2)}%
      </span> : <span className="text-red-500 dark:text-red-400">
        {usd_24h_change.toFixed(2)}%
      </span>}
      {' '}
      24h
    </article>
  )
}
