import { PostMetaPath } from 'interfaces'
import Image from 'next/image'
import Link from 'next/link'

export default function MdxCard({
  folder,
  fileSlug,
  title,
  description,
  sidebar,
}: {
  folder: PostMetaPath['folder']
  fileSlug: PostMetaPath['fileSlug']
  title: PostMetaPath['title']
  description: PostMetaPath['description']
  sidebar: boolean
}) {
  return (
    <Link href={`/${folder}/${fileSlug}`}>
      <a
        className={`block transition h-full rounded-sm border-trueGray-200 dark:border-trueGray-800 focus:ring focus:ring-lightBlue-300 dark:focus:ring-lightBlue-800 focus:outline-none focus:border-lightBlue-300 dark:focus:border-lightBlue-800 hover:border-lightBlue-300 dark:hover:border-lightBlue-800 ${
          sidebar ? 'border-b px-2 py-3 lg:py-2' : 'border px-4 py-3'
        }`}
      >
        {folder === 'coin' ? (
          <header className="flex gap-1 items-center font-semibold">
            <Image
              width={20}
              height={20}
              src={`/logo/${fileSlug}.svg`}
              alt={title}
            />
            <span className="ml-1">{title}</span>
          </header>
        ) : (
          <header className="font-semibold">{title}</header>
        )}
        {!sidebar && <p className="opacity-70 text-sm">{description}</p>}
      </a>
    </Link>
  )
}
