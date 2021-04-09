import Link from 'next/link'

export default function Custom404() {
  return (
    <main className="min-h-screen grid items-center justify-center text-center">
      <section className="space-y-4">
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <a className="block underline font-bold">Go to home</a>
        </Link>
      </section>
    </main>
  )
}
