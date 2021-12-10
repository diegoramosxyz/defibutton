import { ProtocolTvl } from 'interfaces'
import React from 'react'
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

export default function LineChart({ tvl }: { tvl: ProtocolTvl['tvl'] }) {
  // Format dates because the API doesn't provide a good format.
  const dates = tvl.map(({ date }) => +`${date}000`)

  // Round TVL to Billions
  const apiTvls = tvl.map(({ totalLiquidityUSD }) =>
    (+totalLiquidityUSD / 1.0e9).toFixed(2)
  )

  // Get the last value of the array
  const TVL = apiTvls.pop() || 0

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
        Total Value Locked in DeFi (USD) {RoundBigNumber(TVL)}B
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
