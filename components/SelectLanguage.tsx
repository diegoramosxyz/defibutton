import { NextRouter, useRouter } from 'next/router'
import { HiOutlineTranslate } from 'react-icons/hi'
import { Menu, Transition } from '@headlessui/react'

export default function SelectLanguage() {
  const router = useRouter()
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="p-1.5 transition ring-2 ring-trueGray-800 hover:ring-lightBlue-800 rounded-md focus:outline-none">
              <HiOutlineTranslate className="w-5 h-5" />
            </Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="bg-trueGray-50 right-0 dark:bg-trueGray-900 z-10 absolute mt-2 origin-top-right rounded-md overflow-hidden shadow-lg outline-none ring-2 ring-trueGray-800"
              >
                <LanguageOptions router={router} />
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

function LanguageOptions({ router }: { router: NextRouter }) {
  const langs = [
    { locale: 'en', lang: 'English' },
    { locale: 'es', lang: 'Español' },
  ]
  return (
    <>
      {langs.map(({ locale, lang }) => (
        <button
          className={`w-full py-1.5 px-3 hover:bg-trueGray-700 focus:outline-none transition ${
            router.locale === locale && 'bg-trueGray-800 font-bold'
          }`}
          onClick={() => router.push(router.asPath, router.asPath, { locale })}
        >
          {lang}
        </button>
      ))}
    </>
  )
}
