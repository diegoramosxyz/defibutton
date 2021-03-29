import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { RoundBigNumber } from "utils/numbers"

export default function LineChart() {
  const [apiTvls, setApiTvls] = useState([])
  const [dates, setDates] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://api.defillama.com/charts')
      const results = await res.json()

      function getFormattedDate(date: number) {
        return new Date(date).toLocaleDateString(router.locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      }
      results.pop()
      setDates(results.map(({ date }: { date: number }) => getFormattedDate(+`${date}000`)))
      setApiTvls(results.map(({ totalLiquidityUSD }: { totalLiquidityUSD: string }) => (+totalLiquidityUSD / 1.0e9).toFixed(2)))
    }
    getData()
  }, [])

  const data = {
    labels: dates,
    datasets: [
      {
        label: "TVL (BILLION USD)",
        data: apiTvls,
        fill: false,
        backgroundColor: "rgb(0, 255, 0)",
        borderColor: "rgb(0, 155, 0)",
      },
    ],
  }

  return (
    <section className="mx-auto max-w-screen-md mt-4">
      <h1 className="text-center">
        Total Value Locked in DeFi (USD) {RoundBigNumber(apiTvls[apiTvls.length - 1])}B
      </h1>
      <Line
        data={data}
        options={options}
        legend={{ labels: { usePointStyle: true } }}
      />
    </section>
  )
}

const options = {
  animation: {
    duration: 0,
  },
  tooltips: {
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

