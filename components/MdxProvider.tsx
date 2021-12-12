import React from 'react'
import Image from 'next/image'
import { slugify } from 'utils/slugify'

// https://mdxjs.com/table-of-components
// tbody	  Table      body
// code	    Code	     ```code```
// em	      Emphasis	 _emphasis_
// strong	  Strong	   **strong**
// img	    Image	     ![alt](https://mdx-logo.now.sh)

// Headings

const h2 = ({ children, ...props }: { children: React.ReactText }) => {
  const slug = slugify(children.toString())
  return (
    <h2 id={slug} className="scroll-mt-7" {...props}>
      <a href={`#${slug}`}>{children}</a>
    </h2>
  )
}

// Custom components
const Callout = ({ ...props }) => (
  <mark className="grid grid-flow-col gap-2 p-2 lg:p-4 my-6 rounded-md bg-yellow-100 shadow">
    <span className="text-2xl">💡</span>
    <span className="self-center" {...props} />
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
      <div className="rounded-md overflow-hidden shadow">
        <Image src={src} alt={alt} layout="responsive" height={h} width={w} />
      </div>
      <figcaption className="text-sm text-center opacity-75 mt-2 mb-4">
        {alt}
      </figcaption>
    </figure>
  )
}

export const components = {
  h2,
  Callout,
  Photo,
}
