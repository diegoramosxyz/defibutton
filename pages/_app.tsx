import 'tailwindcss/tailwind.css'
import { GlobalProvider } from 'context/GlobalState'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'
import { components } from 'components/MdxProvider'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <GlobalProvider>
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  </GlobalProvider>
)

export default appWithTranslation(MyApp)
