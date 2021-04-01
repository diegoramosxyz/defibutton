import { Coin } from 'interfaces/data-types'
import { connectToDatabase } from 'utils/mongodb'

export default function CoinPage({ coin }: { coin: Coin }) {
  return (
    <pre>
      <code>{JSON.stringify(coin, null, 2)}</code>
    </pre>
  )
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase()

  const coins: Coin[] = await db.collection('coins').find({}).toArray()

  const paths = coins.map((coin) => ({
    params: { slug: coin.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const { db } = await connectToDatabase()

  const coin = await db.collection('coins').findOne({ slug: params?.slug })

  return {
    props: {
      coin: JSON.parse(JSON.stringify(coin)),
    },
  }
}
