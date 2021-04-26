export async function getPriceAnd24hr(geckoId: string, llamaId: string | null) {
  const geckoRes = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd&include_24hr_change=true`
  )
  const geckoData = await geckoRes.json()

  let tvl = []

  if (llamaId) {
    const llamaRes = await fetch(`https://api.llama.fi/protocol/${llamaId}`)
    const llamaData = await llamaRes.json()

    tvl = llamaData.tvl || []
  }

  return {
    usd: geckoData[geckoId].usd,
    tvl,
    usd_24h_change: geckoData[geckoId].usd_24h_change,
  }
}
