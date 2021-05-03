import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const Db = await connectToDatabase()
  if (req.method === 'POST' && req.body.email.length <= 250) {
    await Db?.db.collection('newsletter').insertOne({
      email: req.body.email,
    })
    res.status(200).json({ success: true })
  } else {
    res.status(400).json({ success: false, message: '400 Bad request.' })
  }
}