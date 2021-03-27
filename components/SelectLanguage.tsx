import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export default function SelectLanguage() {
  const router = useRouter()
  const { t } = useTranslation('index')
  return (
    <select
      className="w-full py-2 px-1 rounded-sm transition ring-1 focus:ring ring-trueGray-200 dark:ring-trueGray-800 bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200 focus:outline-none focus:ring-lightBlue-300 dark:focus:ring-lightBlue-700"
      id="locale"
      defaultValue="default"
      onChange={(e) =>
        router.push(router.asPath, router.asPath, {
          locale: e.target.value,
        })
      }
    >
      <option value="default" disabled>
        🌐 {t('language')}
      </option>
      <option value="en">English</option>
      <option value="es">Spanish (Español)</option>
    </select>
  )
}
