import { useRouter } from 'next/router'

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
