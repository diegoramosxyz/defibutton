const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')

const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA({
  pwa: {
    disable: !isProd,
    dest: "public"
  },
  i18n,
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
})

// https://github.com/leerob/leerob.io/pull/310
// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src http://stats.defibutton.com/count.js 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'self';
  connect-src *;
  font-src 'self';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Feature-Policy',
    value: "camera 'none'; microphone 'none'; geolocation 'none'",
  },
]
