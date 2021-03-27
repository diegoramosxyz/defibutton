export async function getPriceAnd24hr(coingeckoId: string, ticker: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd&include_24hr_change=true`
  )
  const data = await res.json()
  return {
    usd: data[coingeckoId].usd,
    usd_24h_change: data[coingeckoId].usd_24h_change,
    ticker,
  }
}
