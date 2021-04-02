import React, { useContext } from 'react'
import SelectLanguage from './SelectLanguage'
import { GlobalContext } from 'context/GlobalState'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import ContentSection from './ContentSection'
import { PostMetaPath } from 'interfaces'

export default function Sidebar({ posts }: { posts: PostMetaPath[] }) {
  const { state } = useContext(GlobalContext)
  const [width, setWidth] = React.useState(0)

  // Initialize width
  React.useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  // Listen to changes in the viewport set width state
  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      {/* Hide the menu when the screen is less than 1024px and the user has not opened the sidebar */}
      {!(state.modal !== '_SIDEBAR_' && width < 1024) && (
        <nav className="z-20 lg:z-0 fixed h-screen pb-5 right-0 top-0 lg:right-auto lg:left-0 lg:w-[240px] overflow-auto bg-trueGray-50 dark:bg-trueGray-900 border-l lg:border-l-0 lg:border-r border-trueGray-200 dark:border-trueGray-800">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <a href="/" className="block text-lg font-bold px-2 py-2.5">
              DeFi Button
            </a>
            <div className="flex items-center space-x-3">
              <a
                href="https://twitter.com/defibutton"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-7 w-7" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://discord.gg/zneGzEVdJN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord className="h-7 w-7" />
                <span className="sr-only">Discord</span>
              </a>
            </div>
          </div>
          <div className="px-2 mb-2">
            <SelectLanguage />
          </div>
          <div className="grid gap-1 mb-5 px-2">
            <ContentSection
              tags={['fundamentals', 'defi', 'tutorials', 'tips', 'extra']}
              sidebar
              posts={posts}
            />
          </div>
        </nav>
      )}
    </>
  )
}
