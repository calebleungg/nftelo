import dbConnect from '../../lib/dbConnect'
import { getPaginatedTokens } from '../../services/tokens'

export default async function handler(req, res) {
  const { 
    query: { skip, take },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const tokens = await getPaginatedTokens("azuki", skip, take)

        res.status(200).json({ success: true, data: tokens })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
