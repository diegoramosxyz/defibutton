if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,c,n)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const i={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return a;case"module":return i;default:return e(s)}}))).then((e=>{const s=n(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Zkoz-k-1jJQpaYwyzSgtM/_buildManifest.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/Zkoz-k-1jJQpaYwyzSgtM/_ssgManifest.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/1bfc9850.a762caa3cb21f379a97f.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/2ecc48c975c8ad72c265e825e4d7ef404cfb7e78.5c45f5061cd631d03edd.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/40326037189ea3e7c776ea69e262bb10834b8785.029c6c6e7d2286a6c43a.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/4a3ea9cd.3fb3188dfbcca4d86d75.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/6bfc8d3b3e32a1db48374dcc12a1d9942fbe6b64.20ac3cb72f18886562f0.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.90ba0c9cc81154c2b0c8.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/75fc9c18.e531d5565728bdfa5ed8.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/b4b0105bdec125eaefe564bcb43f76372e2abe38.61de376af4ff9a32003c.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/d2e60a529f6ffaa1bce1364e1f859f4313ade020.1a0857f637be718a8829.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/d64684d8.00e51281cbfc97aaa576.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/framework.f8bd46fc02868c500bda.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/main-ed000e2dd475a6bec31d.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/404-2df977e4c5308d5acbb4.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/500-e24aa8b257e013e1440d.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/_app-1b694e67834bbdffe9b9.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/_error-cf1497400ec590746c93.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/blog-94b16cc3a1457dfc2236.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/blog/%5Bslug%5D-c63151b39fbdbb63ac61.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/index-1d910d436baaf0241576.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/projects-ba62f2c11325a2a5f89a.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/projects/%5Bslug%5D-1ecd772fe48948ff20d6.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/tags-6449b23ba35d2189397c.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/tags/%5Btag%5D-e9118d5f5ddabd2c54c0.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/tvl-5a49b538a82ac8df101b.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/pages/tvl/%5Bslug%5D-145bddf4a80051d2c67c.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/polyfills-2561d2db27eb35fd0862.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/_next/static/css/e7951aefb26d4de23e78.css",revision:"Zkoz-k-1jJQpaYwyzSgtM"},{url:"/android-icon-192x192.png",revision:"ccd7fbbd98b3e9500f4564b39937cb6d"},{url:"/apple-icon-180x180.png",revision:"521d8800988c1195deb12688ec97623c"},{url:"/apple-icon.png",revision:"ccd7fbbd98b3e9500f4564b39937cb6d"},{url:"/favicon-16.png",revision:"9be41b03241e2e7005f9503af431f2d8"},{url:"/favicon-32.png",revision:"26f414a5b315975200b1307c79c0a87b"},{url:"/favicon.ico",revision:"5c5e0c1d57dd437578d08e2d12a33ca9"},{url:"/icons/maskable_icon_x128.png",revision:"772abd54a50afef5e908660e1750f80f"},{url:"/icons/maskable_icon_x144.png",revision:"85f7c2f381d5d6a8047ac29be5c29f35"},{url:"/icons/maskable_icon_x192.png",revision:"beb6c15511a689e34af9bc6e07cf7c79"},{url:"/icons/maskable_icon_x384.png",revision:"fff2b20301345db0c911cc8918883ddc"},{url:"/icons/maskable_icon_x48.png",revision:"b9e1e94e492121be7509c5d3934a9074"},{url:"/icons/maskable_icon_x512.png",revision:"18311452ffa518a59e062d8b6128bf1d"},{url:"/icons/maskable_icon_x72.png",revision:"57cdf6d55520cd51c103658c0742fc8a"},{url:"/icons/maskable_icon_x96.png",revision:"c1b56633e8cfafc097b36bac8a644f8b"},{url:"/img/new-to-metamask-865x484.png",revision:"85fb1f189a5fb5040bfe8e4203772c61"},{url:"/img/secret-words-774x556.png",revision:"67b041fd3181c82575c3ffa253b0eebb"},{url:"/img/success-563x587.png",revision:"a4915ed183f6d96311479546d8ff998f"},{url:"/locales/en/common.json",revision:"666d7b10f83bf62723a8301dcf686175"},{url:"/locales/en/tableOfContents.json",revision:"6f0e49a1f0c1b6a5db4b481d5e2a4ec1"},{url:"/locales/en/tags.json",revision:"12f25173c9d9bd407618417d7d06aa50"},{url:"/locales/es/common.json",revision:"2ef8ee67cc42394a0b79d175ea0c976b"},{url:"/locales/es/tableOfContents.json",revision:"7abc7b547347019179b8a030e6f30dc0"},{url:"/locales/es/tags.json",revision:"609978f3f6b7d9011608bebe81296d52"},{url:"/logo/aave.svg",revision:"a03fbfaa3b8997dcd2f6202ff868a164"},{url:"/logo/binance-coin.svg",revision:"026e1d7404871261c8397fcadbb76aa8"},{url:"/logo/bitcoin.svg",revision:"24f7bb257e0480540b8e388f129b57b8"},{url:"/logo/chainlink.svg",revision:"cd69698ac5df7a8539e5c469eb131d6d"},{url:"/logo/compound.svg",revision:"d976ba083a0e97daf4ece638a1953441"},{url:"/logo/dai.svg",revision:"ce6f8880d4333fdfe94624de8b603b11"},{url:"/logo/defi-pulse-index.svg",revision:"b3df9acab2cc898306cdf2564ced0795"},{url:"/logo/dogecoin.svg",revision:"67d2dfdb52eef2b80841495b78f1018f"},{url:"/logo/ethereum.svg",revision:"87de24fe5274859b5aa0e281e96bee17"},{url:"/logo/loopring.svg",revision:"4fdc1f569c5982348d7fe04acec6485b"},{url:"/logo/maker.svg",revision:"5dd6efcf4f0cd4dcc8cef2d74ae4a87b"},{url:"/logo/monero.svg",revision:"8ae1a38c19f85478880a58c4d6f68bce"},{url:"/logo/polygon.svg",revision:"e68f431d17df64f9fbde8f01eb71ab76"},{url:"/logo/rari-capital.svg",revision:"eb90f4c0d32cbc8302cb6e282781ba26"},{url:"/logo/ren.svg",revision:"cf9d8badda89f486d896739adb9464f5"},{url:"/logo/solana.svg",revision:"7fc1406515658220dd5743fbef993b66"},{url:"/logo/sushiswap.svg",revision:"e2c9c832c3bde901d625c456901f53aa"},{url:"/logo/synthetix-network-token.svg",revision:"e666a0ed39e685fcbf512b47c87a5baf"},{url:"/logo/the-graph.svg",revision:"47563eee13fc088b367de18f6ca8632c"},{url:"/logo/thorchain.svg",revision:"701a57538ba0421b6730e6fe70e7b9ba"},{url:"/logo/uniswap.svg",revision:"03dace3bbfac66b79c887b0474bec27c"},{url:"/logo/yearn-finance.svg",revision:"b0561b461accca783b20b40a5a8dda34"},{url:"/logo/zcash.svg",revision:"bb4c65795fa776fbf7451ac09c44d392"},{url:"/manifest.json",revision:"d7639ba200499bc6b8c318f54ae952c9"},{url:"/og.png",revision:"6a77253b5dc47f9636fa011c4c7e5629"},{url:"/vid/uni.mp4",revision:"cab4af4e04e9194f84148fcc067b5507"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/api\/(?!auth\/callback\/).*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/(?!api\/).*$/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));