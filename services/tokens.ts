import { ORDER_BY } from "../helpers/constants"
import NonFungibleToken from "../models/NonFungibleToken"

type Collection = "azuki"

export const getPaginatedTokens = async (collection: Collection, skip: number, take: number) => {
  const result = await NonFungibleToken
    .find({ type: collection })
    .sort({ elo: ORDER_BY["desc"] })
    .skip(skip)
    .limit(take)

  const tokens = result.map((azuki) => ({
    ...azuki.toObject(),
    _id: azuki._id.toString()
  }))

  return tokens
}