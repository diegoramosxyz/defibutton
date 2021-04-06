import { connectToDatabase } from './mongodb'

export async function getTags() {
  const Db = await connectToDatabase()
  return await Db?.db.collection('docs').findOne({})
}
