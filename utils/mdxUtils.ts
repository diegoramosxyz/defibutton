import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import { components } from 'components/MdxProvider'

type folders = 'posts' | 'coins'

// return the metadata of the posts to create navigation and file relations using tags
export function getPostsMetadata(folder: folders, locale: string) {
  return postFilePaths(folder, locale).map((filePath) => {
    // read the content of a file coins/en/file1.mdx or posts/es/archivo1.mdx, etc
    const source = fs.readFileSync(
      path.join(path.join(process.cwd(), `${folder}/${locale}`), filePath)
    )

    // extract metadata using frontmatter
    const { data } = matter(source)

    return {
      ...data, // The type is PostMetaPath
      filePath,
    }
  })
}

// Get the HTML for an MDX file
export async function getMdxContent(
  slug: string | string[] | undefined,
  folder: folders,
  locale: string
) {
  if (typeof slug !== 'undefined' && !Array.isArray(slug)) {
    // return path to file as a string coins/en/file1.mdx or posts/es/archivo1.mdx, etc.
    const postFilePath = path.join(
      path.join(process.cwd(), `${folder}/${locale}/`),
      `${slug}.mdx`
    )

    // read the file and return a Buffer using Node.js
    const source = fs.readFileSync(postFilePath)

    // Get metadata from the post
    const { content, data: metadata } = matter(source)

    // Use the helper function from next-mdx-remote to return stringified HMTL
    const mdxSource = await renderToString(content, {
      components,
      scope: metadata,
    })

    return {
      source: mdxSource,
      metadata,
    }
  }
}

// Get the slugs for all the files in a directory (no recursion)
export function getSlugs(folder: folders, locale: string) {
  // return paths in the right form to obey Next.js rules
  // https://nextjs.org/docs/advanced-features/i18n-routing#dynamic-getstaticprops-pages
  // paths: [
  // { params: { slug: 'post-1' }, locale: 'en' },
  // { params: { slug: 'post-1' }, locale: 'es' },
  // ],
  return postFilePaths(folder, locale)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug }, locale }))
}

function postFilePaths(folder: folders, locale: string) {
  // return string[] of filenames from a directory posts/en or coins/es, etc.
  return fs
    .readdirSync(path.join(process.cwd(), `${folder}/${locale}`))
    .filter((path) => /\.mdx?$/.test(path))
}
