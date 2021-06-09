import { ProtocolTvl } from 'interfaces'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import Chart from 'components/tvl/Chart2'
import Layout from 'components/Layout'

export default function Symbol({ protocol }: { protocol: ProtocolTvl }) {
  const router = useRouter()
  const link = `https://api.llama.fi/protocol/${router.query.slug}`
  const { data } = useSWR(link, fetcher, { initialData: protocol })

  return (
    <Layout head={`${data.symbol} DeFi Button`}>
      <section className="max-w-screen-md mx-auto px-3 my-4">
        <header className="flex items-center space-x-2 mb-4">
          {data.logo && <img src={data.logo} width="50px"></img>}
          <h1 className="text-center text-2xl bold my-3">
            {data.name}
            <span className="text-sm font-mono ml-3">{data.symbol}</span>
          </h1>
        </header>
        <article className="grid space-y-3"></article>
      </section>
      <Chart tvl={data.tvl} />
    </Layout>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://api.llama.fi/protocol/${params.slug}`)
  const protocol = await res.json()

  if (!protocol.name) {
    return {
      notFound: true,
    }
  }

  return {
    props: { protocol },
  }
}

export async function getStaticPaths() {
  // Pre-render all pages
  // const res = await fetch('https://api.llama.fi/protocols')
  // const protocols = await res.json()

  // const paths = protocols.map(({ slug }: { slug: string }) => ({
  //   params: { slug },
  // }))

  // Only pre-render one page
  return { paths: [{ params: { slug: 'wbtc' } }], fallback: 'blocking' }
}
