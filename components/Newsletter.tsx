import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

type Inputs = {
  email: string
}

export default function Newsletter() {
  const { t } = useTranslation('common')
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>()
  const [fetchMessage, setfetchMessage] = useState(false)

  function onSubmit(data: Inputs) {
    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.ok
          ? setfetchMessage(true)
          : setError('email', {
              type: 'fetch',
            })
      )
      .catch((_) =>
        setError('email', {
          type: 'fetch',
        })
      )
  }

  return (
    <>
      <h1 className="text-xl font-bold text-center mb-4">
        {t('newsletter')}
      </h1>
      <label htmlFor="email" className="sr-only">
        {t('email')}
      </label>
      <form onSubmit={handleSubmit(onSubmit)} className="grid mb-7">
        {/* Errors and confirmation */}
        <section className="text-center mb-3">
          {errors.email?.type === 'required' && (
            <p>{t('invalid-email')}</p>
          )}
          {errors.email?.type === 'fetch' && (
            <p>{t('something-went-wrong')}</p>
          )}
          {!errors.email && fetchMessage && (
            <p>{t('successful-newsletter-subscription')}</p>
          )}
        </section>
        {/* Inputs and button */}
        <section className="grid md:flex justify-center space-y-3 md:space-y-0 md:space-x-3">
          <input
            {...register('email', { required: true })}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            placeholder={t('email')}
            className="dark:border-trueGray-600 dark:bg-trueGray-900 transition focus:outline-none border font-medium px-3 py-1 rounded-md focus:border-lightBlue-700 dark:focus:border-lightBlue-400"
          />
          <button className="select-none focus:outline-none focus:ring-2 transition border font-medium px-3 py-1 normal-case rounded-md border-lightBlue-600 dark:border-lightBlue-300 text-lightBlue-900 dark:text-lightBlue-50 hover:bg-lightBlue-100 dark:hover:bg-lightBlue-800 focus:ring-lightBlue-500 focus:bg-lightBlue-200 dark:focus:bg-lightBlue-900">
            {t('subscribe')}
          </button>
        </section>
      </form>
    </>
  )
}
