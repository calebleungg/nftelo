import dbConnect from '../../lib/dbConnect'
import NonFungibleToken from '../../models/NonFungibleToken'
import * as Constants from "../../helpers/constants"

const DEFAULT_COLLECTION = "azuki"

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
          query = query.sort({ [sort]: Constants.ORDER_BY[order] })
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
    default:
      res.status(400).json({ success: false })
      break
  }
}
