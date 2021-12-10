import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { slugify } from 'utils/slugify'

// https://mdxjs.com/table-of-components
// tbody	  Table      body
// code	    Code	     ```code```
// em	      Emphasis	 _emphasis_
// strong	  Strong	   **strong**
// img	    Image	     ![alt](https://mdx-logo.now.sh)

// Headings
const h1 = ({ ...props }) => (
  <h1 className='text-3xl font-bold mt-8 mb-3' {...props} />
)
const h2 = ({ children, ...props }: { children: React.ReactText }) => {
  const slug = slugify(children.toString())
  return (
    <h2 id={slug} className='text-2xl font-semibold pt-5 mb-4' {...props}>
      <a href={`#${slug}`}>{children}</a>
    </h2>
  )
}
const h3 = ({ ...props }) => (
  <h3 className='text-xl font-medium mt-6 mb-3' {...props} />
)
const h4 = ({ ...props }) => (
  <h4 className='text-lg font-medium mt-6 mb-2' {...props} />
)
const h5 = ({ ...props }) => (
  <h5 className='text-base font-medium mt-6 mb-2' {...props} />
)
const h6 = ({ ...props }) => (
  <h6 className='text-sm font-medium mt-6 mb-1' {...props} />
)

// Misc.
const p = ({ ...props }) => <p className='mb-3 leading-relaxed' {...props} />
const blockquote = ({ ...props }) => (
  <blockquote
    className='border-t border-b my-6 mx-5 px-5 pt-3 italic'
    {...props}
  />
)
const hr = () => <hr className='my-3' />
const del = ({ ...props }) => <s className='opacity-75' {...props} />
const a = ({ href, ...props }: { href: string }) => (
  <Link href={href}>
    <a {...props} className='underline' rel='noopener noreferrer' />
  </Link>
)

// Lists
const ul = ({ ...props }) => (
  <ul className='list-disc list-inside pb-3 space-y-3' {...props} />
)
const ol = ({ ...props }) => (
  <ol className='list-decimal list-inside pb-3 space-y-3' {...props} />
)

// Tables
const td = ({ ...props }) => (
  <td
    className='border-b border-neutral-200 dark:border-neutral-800 px-4'
    {...props}
  />
)
const tr = ({ ...props }) => <tr className='h-10' {...props} />
const th = ({ ...props }) => <th className='h-10 pr-2' {...props} />
const thead = ({ ...props }) => (
  <thead className='bg-neutral-200 dark:bg-neutral-800' {...props} />
)
const table = ({ ...props }) => (
  <div className='overflow-x-auto'>
    <table
      className='table mx-auto mb-5 mt-7 rounded-t-md overflow-hidden'
      {...props}
    />
  </div>
)

// Code
const inlineCode = ({ ...props }) => (
  <code className='px-1.5 ring-1 ring-current mx-1 rounded-md' {...props} />
)
const pre = ({ ...props }) => (
  <div className='overflow-x-auto text-neutral-200 bg-black p-3 mb-4 rounded-md'>
    <pre>
      <code className='pr-3' {...props} />
    </pre>
  </div>
)

// Custom components
const Callout = ({ ...props }) => (
  <mark className='grid grid-flow-col gap-2 p-2 my-6 rounded-md bg-yellow-100 shadow'>
    <p className='text-2xl'>💡</p>
    <p className='self-center' {...props} />
  </mark>
)

function Photo({
  src,
  alt,
  h,
  w,
}: {
  src: string
  alt: string
  h: number
  w: number
}) {
  return (
    <figure>
      <div className='rounded-md overflow-hidden shadow'>
        <Image src={src} alt={alt} layout='responsive' height={h} width={w} />
      </div>
      <figcaption className='text-sm text-center opacity-75 mt-2 mb-4'>
        {alt}
      </figcaption>
    </figure>
  )
}

// prettier-ignore
export const components = {
  h1, h2, h3, h4, h5, h6, p, ul, ol, td, tr, th, thead, table,
  blockquote, hr, del, a, inlineCode, pre,
  Callout, Photo,
}
