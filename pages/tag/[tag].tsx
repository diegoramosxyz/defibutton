import { GetStaticPaths, GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getPostsMetadata } from "utils/mdxUtils"
import tableOfContents from 'tableOfContents'
import { PostMetaPath } from "interfaces"

export default function Tag({ filteredPosts }: { filteredPosts: PostMetaPath[] }) {
  return (
    <pre><code>{JSON.stringify(filteredPosts, null, 2)}</code></pre>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  const allMeta = [...postsMeta, ...coinsMeta]

  // Only return the posts that contain the tag in the url -> /tag/[tag]
  const filteredPosts = allMeta.filter((post: any) => !!post.tags.find((item: string) => item === params?.tag))

  return {
    props: {
      filteredPosts,
      ...(await serverSideTranslations(locale || 'en', ['index'])),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Extract the keys from the table of contents array and create an array of the type
  // {
  //   params: {
  //       tag: string;
  //   };
  // }[]
  const paths = tableOfContents.map(obj =>
    Object.keys(obj).map(tag => ({ params: { tag: tag } }))).flat()

  return {
    paths,
    fallback: true, // Fallback true because only the tags from the table 
    // of contents will be generated at build time
  }
}