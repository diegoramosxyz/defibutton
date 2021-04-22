import { useRouter } from 'next/router'

// You must use git to get the last edit date
// https://serverfault.com/questions/401437/how-to-retrieve-the-last-modification-date-of-all-files-in-a-git-repository

export default function LastEdit({
  lastModified,
  translation,
}: {
  lastModified: string
  translation: string
}) {
  const { locale } = useRouter()
  if (!!lastModified) {
    const date = new Date(lastModified).toLocaleDateString(locale, {
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
  return <></>
}
