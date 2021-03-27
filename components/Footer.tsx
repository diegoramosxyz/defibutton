import { FaDiscord, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="px-2 py-5 xl:px-0 max-w-screen-md mx-auto border-t border-trueGray-200 dark:border-trueGray-800">
      <div className="flex space-x-4 justify-end">
        <a
          href="https://twitter.com/defibutton"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="h-8 w-8" />
          <span className="sr-only">Twitter</span>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="h-8 w-8" />
          <span className="sr-only">Discord</span>
        </a>
      </div>
    </footer>
  )
}
