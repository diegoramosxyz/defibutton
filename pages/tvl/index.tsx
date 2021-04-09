import Leaderboard from 'components/tvl/Leaderboard'
import Chart from 'components/tvl/Chart'
import Menu from 'components/tvl/Menu'
import Layout from 'components/Layout'

export default function index() {
  return (
    <Layout head="TVL - DeFi Button">
      <main>
        <Chart />
        <Menu />
        <Leaderboard />
      </main>
    </Layout>
  )
}
