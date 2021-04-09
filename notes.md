How to set HTTP headers for Vercel using vercel.json

https://vercel.com/docs/configuration#project/headers

```json
{
  "headers": [
    {
      "source": "/favicon.ico",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/vid/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31556952, immutable"
        }
      ]
    },
    {
      "source": "/img/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31556952, immutable"
        }
      ]
    }
  ]
}
```
