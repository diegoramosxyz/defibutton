import { GetStaticProps } from 'next'
import { getTagsFolder, getTagsForAll } from 'utils/db'

export default function test({ tags, tags2 }: { tags: any; tags2: any }) {
  return (
    <pre>
      {/* <code>{JSON.stringify(tags, null, 2)}</code> */}
      tags2
      <code>{JSON.stringify(tags2, null, 2)}</code>
    </pre>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // console.log(await getTagsFolder('docs', 'safety'))
  return {
    props: {
      tags: JSON.parse(JSON.stringify(await getTagsFolder('docs', 'safety'))),
      tags2: JSON.parse(JSON.stringify(await getTagsForAll('defi'))),
    },
  }
}
