import { PostMetaPath } from 'interfaces'
import Image from 'next/image'
import Link from 'next/link'

export default function MdxCard({
  slug,
  title,
  description,
}: {
  slug: PostMetaPath['slug']
  title: PostMetaPath['title']
  description: PostMetaPath['description']
}) {
  return (
    <Link href={slug.includes('/index/') ? slug.split('/index')[1] : slug}>
      <a className="block hover:-translate-y-1 transition h-full rounded-sm border-neutral-200 dark:border-neutral-800 focus:ring focus:ring-sky-300 dark:focus:ring-sky-800 focus:outline-none focus:border-sky-300 dark:focus:border-sky-800 hover:border-sky-300 dark:hover:border-sky-800 border px-4 py-3 lg:px-6 lg:py-4">
        {slug.includes('/projects/') ? (
          <header className="flex gap-1 items-center font-semibold mb-1">
            <Image
              width={20}
              height={20}
              src={`/logo/${slug.split('/projects/')[1]}.svg`}
              alt={title}
            />
            <span className="ml-1">{title}</span>
          </header>
        ) : (
          <header className="font-semibold mb-1">{title}</header>
        )}
        <p className="opacity-70 text-sm">{description}</p>
      </a>
    </Link>
  )
}
