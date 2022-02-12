import dbConnect from '../../lib/dbConnect'
import logger from '../../lib/logger'
import { getNonFungibleTokenPairs } from '../../services/pairs'

export default async function handler(req, res) {
  const {
    query: { take, excludes },
    method
  } = req

  await dbConnect()
  logger.info({ path: "/api/pairs", method })

  switch (method) {
    case 'GET':
      try {
        const data = await getNonFungibleTokenPairs({ take: Number(take), excludes })

        res.status(200).json({ success: true, data })
      } catch(error) {
        logger.error({ path: "/api/pairs", method, error })
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
