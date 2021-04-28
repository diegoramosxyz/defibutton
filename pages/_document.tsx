import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // SOURCE: https://github.com/gokulkrishh/awesome-meta-and-manifest
    return (
      <Html className="bg-trueGray-50 text-trueGray-800 dark:bg-trueGray-900 dark:text-trueGray-200">
        {/* prettier-ignore */}
        <Head />
        {/* Must  */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="DeFi Button provides simple explanations of complex topics in decentralized finance (DeFi). It also provides insight into cryptocurrencies and blockchains like Bitcoin and Ethereum and DeFi tools and platforms like Aave, Uniswap, Sushiswap and Yearn."
        />
        <meta
          name="keywords"
          content="bitcoin, btc, ethereum, eth, price, finance, defi, education, free, decentralization"
        />

        {/* Android   */}
        <meta name="theme-color" content="#171717" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* iOS  */}
        <meta name="apple-mobile-web-app-title" content="DeFi Button" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Windows   */}
        <meta name="msapplication-navbutton-color" content="#171717" />
        <meta name="msapplication-TileColor" content="#171717" />
        {/* <meta name="msapplication-TileImage" content="ms-icon-144x144.png"/> */}
        {/* <meta name="msapplication-config" content="browserconfig.xml"/> */}

        {/* Pinned Sites   */}
        <meta name="application-name" content="DeFi Button" />
        {/* <meta name="msapplication-tooltip" content="Tooltip Text"/> */}
        <meta name="msapplication-starturl" content="/" />

        {/* Tap highlighting   */}
        <meta name="msapplication-tap-highlight" content="no" />

        {/* UC Mobile Browser   */}
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />

        {/* Layout mode  */}
        <meta name="layoutmode" content="fitscreen" />

        {/* Orientation   */}
        <meta name="screen-orientation" content="portrait" />

        {/* Main Link Tags   */}
        <link href="favicon-16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="favicon-32.png" rel="icon" type="image/png" sizes="32x32" />
        {/* <link href="favicon-48.png" rel="icon" type="image/png" sizes="48x48"/> */}

        {/* iOS   */}
        {/* <link href="touch-icon-iphone.png" rel="apple-touch-icon"/>
          <link href="touch-icon-ipad.png" rel="apple-touch-icon" sizes="76x76"/>
          <link href="touch-icon-iphone-retina.png" rel="apple-touch-icon" sizes="120x120"/>
          <link href="touch-icon-ipad-retina.png" rel="apple-touch-icon" sizes="152x152"/> */}

        {/* Startup Image   */}
        {/* <link href="touch-icon-start-up-320x480.png" rel="apple-touch-startup-image"/> */}

        {/* Pinned Tab   */}
        <link
          href="path/to/icon.svg"
          rel="mask-icon"
          sizes="any"
          color="#171717"
        />

        {/* Android   */}
        <link href="icon-192x192.png" rel="icon" sizes="192x192" />
        <link href="icon-128x128.png" rel="icon" sizes="128x128" />

        {/* Others  */}
        <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />

        {/* UC Browser   */}
        <link
          href="images/icon-52x52.png"
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
        />
        <link
          href="images/icon-72x72.png"
          rel="apple-touch-icon"
          sizes="72x72"
        />

        {/* Manifest.json   */}
        <link href="/manifest.json" rel="manifest" />

        {/* DELETE THESE */}
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

        {/* Twitter */}
        <meta name="twitter:image" content="https://defibutton.com/og.png" />
        <meta name="twitter:site:domain" content="defibutton.com" />
        <meta name="twitter:url" content="https://defibutton.com" />
        <meta name="twitter:title" content="DeFi Button" />
        <meta
          name="twitter:description"
          content="DeFi Button provides simple explanations of complex topics in decentralized finance (DeFi). It also provides insight into cryptocurrencies and blockchains like Bitcoin and Ethereum and DeFi tools and platforms like Aave, Uniswap, Sushiswap and Yearn."
        />
        <meta name="twitter:creator" content="@DeFiButton" />

        {/* OG */}
        <meta name="og:title" content="DeFi Button: Learn about DeFi." />
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
    );
  }
}

export default MyDocument;
