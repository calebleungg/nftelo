import dbConnect from '../../lib/dbConnect'
import logger from '../../lib/logger'
import { getPaginatedTokens } from '../../services/tokens'

export default async function handler(req, res) {
  const { 
    query: { skip, take },
    method,
  } = req

  await dbConnect()
  logger.info({ path: "/api", method })

  switch (method) {
    case 'GET':
      try {
        const tokens = await getPaginatedTokens("azuki", skip, take)

        res.status(200).json({ success: true, data: tokens })
      } catch (error) {
        logger.error({ path: "/api", method, error })
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
