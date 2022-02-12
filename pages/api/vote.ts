import dbConnect from '../../lib/dbConnect'
import logger from '../../lib/logger'
import { processEloForVote } from '../../services/vote'

export default async function handler(req, res) {
  const { method, body } = req

  await dbConnect()
  logger.info({ path: "/api/vote", method })

  switch (method) {
    case 'PUT':
      try {
        const { winnerId, loserId } = body
        await processEloForVote(winnerId, loserId)

        res.status(200).json({ success: true, data: 'thanks for your vote!' })
      } catch(error) {
        logger.info({ path: "/api/vote", method, error })
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
