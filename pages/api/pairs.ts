import dbConnect from '../../lib/dbConnect'
import { getNonFungibleTokenPairs } from '../../services/pairs'

export default async function handler(req, res) {
  const {
    query: { take, excludes },
    method
  } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const data = await getNonFungibleTokenPairs({ take: Number(take), excludes })

        res.status(200).json({ success: true, data })
      } catch(error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
