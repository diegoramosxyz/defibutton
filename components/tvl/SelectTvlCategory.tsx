import { HiChevronDown } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { GlobalContext } from 'context/GlobalState'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export default function SelectTvlCategory() {
  const { dispatch } = useContext(GlobalContext)
  const {
    query: { category },
  } = useRouter()

  useEffect(() => {
    // If the category exists and it's not an array
    if (!!category && !Array.isArray(category)) {
      dispatch({
        type: 'SELECT_TVL_CATEGORY',
        payload: category.replace(/^\w/, (c) => c.toUpperCase()),
      })
    }
  }, [category])

  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex space-x-2 items-center py-2 pl-2 pr-1 transition ring-2 ring-neutral-200 dark:ring-neutral-800 hover:ring-lightBlue-200 dark:hover:ring-lightBlue-800 focus:ring-lightBlue-200 dark:focus:ring-lightBlue-800 rounded-md focus:outline-none">
          <p>{category || 'Category'}</p>
          <HiChevronDown className="w-5 h-5" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="max-h-[250px] overflow-y-auto bg-neutral-50 left-0 dark:bg-neutral-900 z-10 absolute mt-2 divide-y-2 divide-neutral-200 dark:divide-neutral-800 origin-top-left rounded-md overflow-hidden shadow-lg outline-none ring-2 ring-neutral-200 dark:ring-neutral-800">
          <DropdownMenu.Label />
          <DropdownMenu.Item>
            <TvlCategories />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}

function TvlCategories() {
  const router = useRouter()
  const categories = [
    'assets',
    'minting',
    'lending',
    'dexes',
    'services',
    'yield',
    'payments',
    'insurance',
    'chain',
    'options',
    'layer2',
    'derivatives',
    'others',
  ]
  return (
    <>
      {categories.map((category) => (
        <button
          key={category}
          disabled={router.query.category === category}
          className={`w-full text-lg md:text-base py-3 md:py-1.5 px-4 md:px-3 hover:bg-neutral-100 hover:underline dark:hover:bg-neutral-700 focus:outline-none transition capitalize ${
            router.query.category === category
              ? 'font-bold hover:no-underline cursor-not-allowed'
              : ''
          }`}
          onClick={() => router.push({ query: { category } })}
        >
          {category}
        </button>
      ))}
    </>
  )
}
