import { GetStaticProps } from 'next'
import { getTags } from 'utils/db'

export default function test({ tags }: { tags: any }) {
  return (
    <pre>
      <code>{JSON.stringify(tags, null, 2)}</code>
    </pre>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.log(await getTags())
  return {
    props: {
      tags: JSON.parse(JSON.stringify(await getTags())),
    },
  }
}
