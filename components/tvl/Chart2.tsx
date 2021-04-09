import { ProtocolTvl } from 'interfaces/data-types'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { RoundBigNumber, RoundBigNumberNoLetter } from 'utils/numbers'

export default function LineChart({ tvl }: { tvl: ProtocolTvl['tvl'] }) {
  // Format dates because the API doesn't provide a good format.
  const dates = tvl.map(({ date }) => +`${date}000`)

  // Round TVL to Billions
  const apiTvls = tvl.map(({ totalLiquidityUSD }) => RoundBigNumberNoLetter(totalLiquidityUSD))

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
        Total Value Locked in DeFi (USD){' '}
        {RoundBigNumber(TVL)}B
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
  elements: {
    point: {
      radius: 0,
    },
  },
  tooltips: {
    // mode: 'nearest',
    intersect: false,
  },
  // responsive: true,
  // maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          autoskip: true,
          autoSkipPadding: 50,
        },
        type: 'time',
        distribution: 'series',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D',
          },
          tooltipFormat: 'MMM D, YYYY',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          // drawOnChartArea: true,
        },
        ticks: {
          // stepSize: 1,
          beginAtZero: false,
        },
      },
    ],
  },
}
