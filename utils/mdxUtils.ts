import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import { components } from 'components/MdxProvider'
import { exec } from 'child_process'
import { Readable } from 'stream'
import { folders, postMetadata } from 'interfaces'

function readFile(folder: folders, locale: string, slug: string) {
  try {
    return fs.readFileSync(
      path.join(path.join(process.cwd(), `${folder}/${locale}`), `${slug}.mdx`)
    )
  } catch (error) {
    return null
  }
}

// return the metadata of the posts to create navigation and file relations using tags
export function getPostsMetadata(folder: folders, locale: string) {
  return (
    postFileSlugs(folder, locale)
      .map((slug) => {
        // read the content of a file coins/en/file1.mdx or posts/es/archivo1.mdx, etc
        const source = readFile(folder, locale, slug)

        // extract metadata using frontmatter
        if (source !== null) {
          const { data } = matter(source)

          return {
            ...data, // The type is PostMetaPath
            slug,
            folder,
          }
        }
      })
      // Remove undefined values from the array
      .filter((item): item is postMetadata => !!item)
  )
}

// return the metadata of the posts to create navigation and file relations using tags
export function getOnePostMetadata(
  slug: string,
  folder: folders,
  locale: string
) {
  // read the content of a file coins/en/file1.mdx or posts/es/archivo1.mdx, etc
  const source = readFile(folder, locale, slug)

  // extract metadata using frontmatter
  if (source !== null) {
    const { data } = matter(source)

    return {
      ...data, // The type is PostMetaPath
      folder,
    }
  }
}

// Get the HTML for an MDX file
export async function getMdxContent(
  slug: string,
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

  // read the file and return a Buffer using Node.js
  const source = readFile(folder, locale, slug)

  // Get metadata from the post
  if (source !== null) {
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
      },
    }
  }
}

// Get an array of mdx metadata objects from all mdx files
export function getAllMdxMeta(locale: string | undefined) {
  const postsMeta = getPostsMetadata('blog', locale || 'en')
  const coinsMeta = getPostsMetadata('coin', locale || 'en')

  // The metadata is used to populate the sidebar
  return [...postsMeta, ...coinsMeta]
}

// Get the slugs for all the files in a directory (no recursion)
export function getSlugs(folder: folders, locale: string) {
  // return paths in the right form to obey Next.js rules
  // https://nextjs.org/docs/advanced-features/i18n-routing#dynamic-getstaticprops-pages
  // paths: [
  // { params: { slug: 'post-1' }, locale: 'en' },
  // { params: { slug: 'post-1' }, locale: 'es' },
  // ],
  return postFileSlugs(folder, locale).map((slug) => ({
    params: { slug },
    locale,
  }))
}

export function postFileSlugs(folder: folders, locale: string) {
  // return string[] of filenames from a directory posts/en or coins/es, etc.
  return fs
    .readdirSync(path.join(process.cwd(), `${folder}/${locale}`))
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''))
  // output: ['slug', 'another-slug'] 
}
