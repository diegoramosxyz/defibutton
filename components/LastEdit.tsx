import { useRouter } from 'next/router'

// You must use git to get the last edit date
// https://serverfault.com/questions/401437/how-to-retrieve-the-last-modification-date-of-all-files-in-a-git-repository

export default function LastEdit({
  mtime,
  translation,
}: {
  mtime: string
  translation: string
}) {
  const { locale } = useRouter()

  const date = new Date(mtime).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <time>
      {translation}: {date}
    </time>
  )
}
