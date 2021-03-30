import Hero from 'components/tvl/Hero'
import Leaderboard from 'components/tvl/Leaderboard'
import Chart from 'components/tvl/Chart'
import Menu from 'components/tvl/Menu'

export default function index() {
  return (
    <main>
      <Hero />
      <Chart />
      <Menu />
      <Leaderboard />
    </main>
  )
}
