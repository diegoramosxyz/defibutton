import 'tailwindcss/tailwind.css'
import { GlobalProvider } from 'context/GlobalState'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <GlobalProvider>
    <Component {...pageProps} />
  </GlobalProvider>
)

export default appWithTranslation(MyApp)
