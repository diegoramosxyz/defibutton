import { GetStaticProps } from 'next'
import { exec } from 'child_process'

export default function test({ stdout }: { stdout: any }) {
  return (
    <pre>
      <code>{JSON.stringify(stdout, null, 2)}</code>
    </pre>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const test = '/coin/es/bitcoin.mdx'
  const { stdout } = exec(
    // get the last modified date of the documents using git logs. printf removes new lines
    `printf $(git log -1 --date=iso8601-strict --format="%ad" -- "$(pwd)${test}")`,
    (error) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
    }
  )

  // https://stackoverflow.com/a/49428486
  function streamToString(stream: typeof stdout) {
    const chunks: any = []
    return new Promise((resolve, reject) => {
      stream?.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream?.on('error', (err) => reject(err))
      stream?.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
  }

  return {
    props: {
      stdout: await streamToString(stdout),
    },
  }
}
