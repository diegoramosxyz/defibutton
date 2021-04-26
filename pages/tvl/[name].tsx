import { ProtocolTvl } from 'interfaces'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import Chart from 'components/tvl/Chart2'

export default function Symbol({ protocol }: { protocol: ProtocolTvl }) {
  const router = useRouter()
  const link = `https://api.llama.fi/protocol/${router.query.name}`
  const { data } = useSWR(link, fetcher, { initialData: protocol })

  return (
    <>
      {data ? (
        <>
          <Head>
            <title>{data.symbol}</title>
          </Head>
          <p className="text-center text-2xl bold my-3">{data.name}</p>
          <Chart tvl={data.tvl} />
          <article className="grid">
            <section>Address: {data.address}</section>
            <section>Ticker: {data.symbol}</section>
            <section>URL: {data.url}</section>
            <section>Description: {data.description}</section>
            <section>Chain: {data.chain}</section>
            <section>Category: {data.category}</section>
            {data.logo && <img src={data.logo} width="50px"></img>}
          </article>
        </>
      ) : (
        <div>No Data</div>
      )}
    </>
  )
}

export async function getStaticProps({ params }: { params: { name: string } }) {
  // The DeFiLlama API recognizes the name of the protocols all lowercase and
  // dashes instead of spaces
  // https://github.com/DefiLlama/defillama-server/blob/master/src/getProtocol.ts
  const name = params.name.toLowerCase().replace(' ', '-')

  const res = await fetch(`https://api.llama.fi/protocol/${name}`)
  const protocol = await res.json()

  // if (!protocol) {
  //   return {
  //     notFound: true,
  //   }
  // }

  return {
    props: { protocol },
  }
}

export async function getStaticPaths() {
  // const res = await fetch('https://api.llama.fi/protocols')
  // const protocols = await res.json()

  // const paths = protocols.map(({ name }: { name: string }) => ({
  //   params: { name },
  // }))

  return { paths: [{ params: { name: 'WBTC' } }], fallback: false }
}
