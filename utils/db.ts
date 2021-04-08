import { connectToDatabase } from './mongodb'

// Get all the documents that contain the tag in one collection
export async function getSlugsFromDb(folder: 'coins' | 'docs') {
  const Db = await connectToDatabase()

  const res = await Db?.db.collection(folder).find().toArray()
  return res?.map((obj) => obj?.slug)
}

// Get all the documents that contain the tag in one collection
export async function getTagsFolder(folder: 'coins' | 'docs', tag: string) {
  const Db = await connectToDatabase()

  const query = { tags: tag }

  return await Db?.db.collection(folder).find(query).toArray()
}

// Get all the documents that contain the tag in all collections
export async function getTagsForAll(tag: string) {
  const Db = await connectToDatabase()
  const coins = Db?.db.collection('coins')
  const docs = Db?.db.collection('docs')

  const query = { tags: tag }

  const coinTags = await coins?.find(query).toArray()
  const docTags = await docs?.find(query).toArray()

  return [coinTags, docTags].flat()
}

// Get one document from a collection based on the slug
export async function getMetadataBySlug(
  folder: 'coins' | 'docs',
  slug: string
) {
  const Db = await connectToDatabase()

  const query = { slug }

  return await Db?.db.collection(folder).find(query).toArray()
}
