import { connectToDatabase } from 'utils/mongodb'

export default function index({ coins }: { coins: [] }) {
  return (
    <pre>
      <code>{JSON.stringify(coins, null, 2)}</code>
    </pre>
  )
}

export async function getStaticProps() {
  const { db } = await connectToDatabase()

  const coins = await db.collection('coins').find({}).toArray()

  return {
    props: {
      coins: JSON.parse(JSON.stringify(coins)),
    },
  }
}
