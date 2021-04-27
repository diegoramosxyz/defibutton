import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200">
        <Head />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="application-name" content="DeFi Button" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DeFi Button" />
        <meta
          name="description"
          content="DeFi Button provides simple explanations of complex topics in decentralized finance (DeFi). It also provides insight into cryptocurrencies and blockchains like Bitcoin and Ethereum and DeFi tools and platforms like Aave, Uniswap, Sushiswap and Yearn."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#171717" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#ffffff" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:image" content="https://defibutton.com/og.png" />
        <meta name="twitter:site:domain" content="defibutton.com" />
        <meta name="twitter:url" content="https://defibutton.com" />
        <meta name="og:title" content="DeFi Button: Learn about DeFi." />
        <meta name="twitter:title" content="DeFi Button" />
        <meta
          name="twitter:description"
          content="DeFi Button provides simple explanations of complex topics in decentralized finance (DeFi). It also provides insight into cryptocurrencies and blockchains like Bitcoin and Ethereum and DeFi tools and platforms like Aave, Uniswap, Sushiswap and Yearn."
        />
        <meta name="twitter:creator" content="@DeFiButton" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="DeFi Button provides simple explanations of complex topics in decentralized finance (DeFi). It also provides insight into cryptocurrencies and blockchains like Bitcoin and Ethereum and DeFi tools and platforms like Aave, Uniswap, Sushiswap and Yearn."
        />
        <meta property="og:site_name" content="DeFi Button" />
        <meta property="og:url" content="https://defibutton.com" />
        <meta property="og:image" content="https://defibutton.com/og.png" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
