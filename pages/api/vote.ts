import dbConnect from '../../lib/dbConnect'
import { processEloForVote } from '../../services/vote'

export default async function handler(req, res) {
  const { method, body } = req
  await dbConnect()

  switch (method) {
    case 'PUT':
      try {
        const { winnerId, loserId } = body
        await processEloForVote(winnerId, loserId)

        res.status(200).json({ success: true, data: 'got em' })
      } catch(error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
