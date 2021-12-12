import { PostMetaPath } from 'interfaces'
import Image from 'next/image'
import Link from 'next/link'

export default function MdxCard({
  folder,
  slug,
  title,
  description,
}: {
  folder: PostMetaPath['folder']
  slug: PostMetaPath['slug']
  title: PostMetaPath['title']
  description: PostMetaPath['description']
}) {
  return (
    <Link href={`/${folder}/${slug}`}>
      <a className="block hover:-translate-y-1 transition h-full rounded-sm border-neutral-200 dark:border-neutral-800 focus:ring focus:ring-sky-300 dark:focus:ring-sky-800 focus:outline-none focus:border-sky-300 dark:focus:border-sky-800 hover:border-sky-300 dark:hover:border-sky-800 border px-4 py-3">
        {folder === 'projects' ? (
          <header className="flex gap-1 items-center font-semibold mb-1">
            <Image
              width={20}
              height={20}
              src={`/logo/${slug}.svg`}
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
