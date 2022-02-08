import dbConnect from '../../lib/dbConnect'
import NonFungibleToken from '../../models/NonFungibleToken'

const ORDER_BY = {
  asc: 1,
  desc: -1
}

const DEFAULT_COLLECTION = "azuki"

const ELO_CONSTANT = 400
const ELO_K_FACTOR = 32

export default async function handler(req, res) {
  const { 
    query: { skip, take, sort, order, exclude, type },
    method,
    body
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let query = NonFungibleToken.find({})

        if (skip && take) {
          query = query.skip(skip).limit(take)
        }

        if (sort && order) {
          query = query.sort({ [sort]: ORDER_BY[order] })
        }

        if (exclude) {
          query = query.find({ _id: { $nin: exclude.split(",") } })
        }

        if (type) {
          query = query.find({ type: type || DEFAULT_COLLECTION })
        }

        const nfts = await query
        res.status(200).json({ success: true, data: nfts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const { winnerId, loserId } = body
        const [winnerToken, loserToken] = await Promise.all([
          NonFungibleToken.findById(winnerId),
          NonFungibleToken.findById(loserId)
        ])

        const transformedRatingWinner = Math.pow(10, winnerToken.elo / ELO_CONSTANT)
        const transformedRatingLoser = Math.pow(10, loserToken.elo / ELO_CONSTANT)
      
        const expectedScoreWinner = transformedRatingWinner / (transformedRatingWinner + transformedRatingLoser)
        const expectedScoreLoser = transformedRatingLoser / (transformedRatingWinner + transformedRatingLoser)
      
        const newEloRatingWinner = winnerToken.elo + ELO_K_FACTOR * (1 - expectedScoreWinner)
        const newEloRatingLoser = loserToken.elo + ELO_K_FACTOR * (0 - expectedScoreLoser)

        await Promise.all([
          NonFungibleToken.updateOne({ _id: winnerToken.id }, { elo: newEloRatingWinner, votes: winnerToken.votes + 1 }),
          NonFungibleToken.updateOne({ _id: loserToken.id }, { elo: newEloRatingLoser, votes: loserToken.votes + 1 })
        ])

        res.status(200).json({ success: true, data: 'dimsum' })
      } catch(error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
