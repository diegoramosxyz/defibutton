import { connectToDatabase } from './mongodb'

// Get all the documents that contain the tag in one collection
export async function getSlugsFromDb(folder: 'coins' | 'docs') {
  const Db = await connectToDatabase()

  const res = await Db?.db.collection(folder).find().toArray()
  return res?.map((obj) => obj?.slug)
}

// Get all distinct tags in all collections
export async function getAllDistinctTags() {
  const Db = await connectToDatabase()
  const coins = Db?.db.collection('coins')
  const docs = Db?.db.collection('docs')

  const field = 'tags'

  const coinTags = await coins?.distinct(field)
  const docTags = await docs?.distinct(field)

  return [coinTags, docTags].flat()
}

// Get all the documents that contain the tag in all collections
export async function getTagsForAll(tag: string | string[] | undefined) {
  // If tag exists and it's not an array of strings
  if (tag && !Array.isArray(tag)) {
    const Db = await connectToDatabase()
    const coins = Db?.db.collection('coins')
    const docs = Db?.db.collection('docs')

    const query = { tags: tag }

    const coinTags = await coins?.find(query).toArray()
    const docTags = await docs?.find(query).toArray()

    return [coinTags, docTags].flat()
  }
  return []
}

// Get one document from a collection based on the slug
export async function getMetadataBySlug(
  folder: 'coins' | 'docs',
  slug: string | string[] | undefined
) {
  // If slug exists and it's not an array of strings
  if (slug && !Array.isArray(slug)) {
    const Db = await connectToDatabase()

    const query = { slug }

    const res = await Db?.db.collection(folder).findOne(query)
    return JSON.parse(JSON.stringify(res))
  }
  return []
}
