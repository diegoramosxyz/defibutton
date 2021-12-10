import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { RoundBigNumber } from 'utils/numbers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function LineChart() {
  const [apiTvls, setApiTvls] = useState([])
  const [dates, setDates] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://api.llama.fi/charts')
      const results = await res.json()

      // results.pop()
      // Fix date format, API doesn't provide a good format
      setDates(results.map(({ date }: { date: number }) => +`${date}000`))
      setApiTvls(
        results.map(({ totalLiquidityUSD }: { totalLiquidityUSD: string }) =>
          (+totalLiquidityUSD / 1.0e9).toFixed(2)
        )
      )
    }
    getData()
  }, [])

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'TVL (BILLION USD)',
        data: apiTvls,
        fill: false,
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(0, 155, 0)',
      },
    ],
  }

  return (
    <section className="mx-auto max-w-screen-md mb-4">
      <h1 className="text-center">
        Total Value Locked in DeFi (USD){' '}
        {RoundBigNumber(apiTvls[apiTvls.length - 1])}B
      </h1>
      <Line
        data={data}
        options={{
          responsive: true,

          elements: {
            point: {
              radius: 0,
            },
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              // gridLines: {
              //   display: false,
              // },
              ticks: {
                // autoskip: true,
                autoSkipPadding: 50,
              },
              // type: 'time',
              // distribution: 'series',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D',
                },
                tooltipFormat: 'MMM D, YYYY',
              },
            },
            y: {
              // gridLines: {
              //   display: false,
              // },
              // ticks: {
              //   beginAtZero: false,
              // },
            },
          },
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart',
            },
          },
        }}
      />
    </section>
  )
}
