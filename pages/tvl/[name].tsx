import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Symbol() {
  const [protocol, setProtocol] = useState({})
  const router = useRouter()


  // LOAD INITIAL DATA
  useEffect(() => {
    async function data() {
      const res = await fetch(`https://api.defillama.com/protocol/${router.query.name}`)
      const data = await res.json()
      setProtocol(data)
    }
    data()
  }, [])

  return (
    <>
      <Head>
        <title>{router.query.symbol}</title>
      </Head>
      <p className="text-center text-2xl bold">{router.query.name}</p>
      <pre>
        <code>{JSON.stringify(protocol, null, 2)}</code>
      </pre>
    </>
  )
}

