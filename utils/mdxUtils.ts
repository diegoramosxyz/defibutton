import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import { components } from 'components/MdxProvider'
import blogTags from 'blog/tags'
import coinTags from 'coin/tags'
import { exec } from 'child_process'
import { Readable } from 'stream'

type folders = 'blog' | 'coin'

// return the metadata of the posts to create navigation and file relations using tags
export function getPostsMetadata(folder: folders, locale: string) {
  return postFilePaths(folder, locale).map((filePath) => {
    // read the content of a file coins/en/file1.mdx or posts/es/archivo1.mdx, etc
    const source = fs.readFileSync(
      path.join(path.join(process.cwd(), `${folder}/${locale}`), filePath)
    )

    const fileSlug = filePath.replace(/\.mdx?$/, '')

    // extract metadata using frontmatter
    const { data } = matter(source)

    return {
      ...data, // The type is PostMetaPath
      fileSlug,
      folder,
      tags: folder === 'blog' ? blogTags[fileSlug] : coinTags[fileSlug],
    }
  })
}

// Get the HTML for an MDX file
export async function getMdxContent(
  slug: string | string[] | undefined,
  folder: folders,
  locale: string
) {
  // https://stackoverflow.com/a/49428486
  function streamToString(stream: Readable | null) {
    const chunks: any = []
    return new Promise((resolve, reject) => {
      stream?.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream?.on('error', (err) => reject(err))
      stream?.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
  }

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

    const { stdout } = exec(
      // get the last modified date of the documents using git logs. printf removes new lines
      `printf $(git log -1 --date=iso8601-strict --format="%ad" -- "$(pwd)/${folder}/${locale}/${slug}.mdx")`,
      (error) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
      }
    )

    return {
      source: mdxSource,
      metadata: {
        ...metadata,
        lastModified: await streamToString(stdout),
        tags: folder === 'blog' ? blogTags[slug] : coinTags[slug],
      },
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
