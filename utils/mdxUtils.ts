import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { exec } from 'child_process'
import { Readable } from 'stream'
import { postMetadata } from 'interfaces'
import { serialize } from 'next-mdx-remote/serialize'

function readFile(locale: string, slug: string) {
  try {
    return fs.readFileSync(
      path.join(path.join(process.cwd(), `posts/${locale}`), `${slug}.mdx`)
    )
  } catch (error) {
    return null
  }
}

// return the metadata of the posts to create navigation and file relations using tags
export function getPostsMetadata(locale: string) {
  return (
    postFileSlugs(locale)
      .map((slug) => {
        // read the content of a file /en/file1.mdx or posts/blog/es/archivo1.mdx, etc
        const source = readFile(locale, slug)

        // extract metadata using frontmatter
        if (source !== null) {
          const { data } = matter(source)

          return {
            ...data, // The type is PostMetaPath
            slug,
          }
        }
      })
      // Remove undefined values from the array
      .filter((item): item is postMetadata => !!item)
  )
}

// return the metadata of the posts to create navigation and file relations using tags
export function getOnePostMetadata(slug: string, locale: string) {
  // read the content of a file coins/en/file1.mdx or posts/es/archivo1.mdx, etc
  const source = readFile(locale, slug)

  // extract metadata using frontmatter
  if (source !== null) {
    const { data } = matter(source)

    return {
      ...data, // The type is PostMetaPath
    }
  }
}

// Get the HTML for an MDX file
export async function getMdxContent(slug: string, locale: string) {
  // https://stackoverflow.com/a/49428486
  function streamToString(stream: Readable | null) {
    const chunks: any = []
    return new Promise((resolve, reject) => {
      stream?.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream?.on('error', (err) => reject(err))
      stream?.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
  }

  // read the file and return a Buffer using Node.js
  const source = readFile(locale, slug)

  // Get metadata from the post
  if (source !== null) {
    const { content, data: metadata } = matter(source)
    // Use the helper function from next-mdx-remote to return stringified HMTL
    const mdxSource = await serialize(content, {
      scope: metadata,
    })

    const { stdout } = exec(
      // get the last modified date of the documents using git logs. printf removes new lines
      `printf $(git log -1 --date=iso8601-strict --format="%ad" -- "$(pwd)/posts/${locale}${slug}.mdx")`,
      (error) => {
        if (error) {
          console.error(error.message)
        }
      }
    )

    return {
      source: mdxSource,
      metadata: {
        ...metadata,
        lastModified: await streamToString(stdout),
      },
    }
  }
}

// Get the slugs for all the files in a directory (no recursion)
export function getSlugs(locale: string, subPath: string) {
  // return paths in the right form to obey Next.js rules
  // https://nextjs.org/docs/advanced-features/i18n-routing#dynamic-getstaticprops-pages
  // paths: [
  // { params: { slug: 'post-1' }, locale: 'en' },
  // { params: { slug: 'post-1' }, locale: 'es' },
  // ],
  return postFileSlugs(locale, subPath).map((slug) => ({
    params: { slug: slug.split(subPath)[1] },
    locale,
  }))
}

// WARNING: Recursive function
export function postFileSlugs(locale: string, subPath?: string) {
  let paths: string[] = []

  function getPathsRecursively(directory: string) {
    fs.readdirSync(directory).forEach((file) => {
      const absolutePath = path.join(directory, file)
      fs.statSync(absolutePath).isDirectory()
        ? getPathsRecursively(absolutePath)
        : paths.push(absolutePath)
    })
  }

  getPathsRecursively(
    path.join(process.cwd(), `posts/${locale}${subPath ? subPath : ''}`)
  )

  return (
    paths
      // filter files with .mdx extension
      .filter((path) => /\.mdx?$/.test(path))
      // remove the file's extension and the rest of the path
      .map((path) => path.replace(/\.mdx?$/, '').split(`/${locale}`)[1])
  )
  // output: ['slug', '/sub-directory/another-slug']
}
