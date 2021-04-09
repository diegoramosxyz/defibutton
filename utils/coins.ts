export async function getPriceAnd24hr(geckoId: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd&include_24hr_change=true`
  )
  const data = await res.json()
  return {
    usd: data[geckoId].usd,
    usd_24h_change: data[geckoId].usd_24h_change,
  }
}
