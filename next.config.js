const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cache-Control',
            value: 'max-age=31536000',
          },
        ],
      },
    ]
  },
}
