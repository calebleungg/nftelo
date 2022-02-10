import { ORDER_BY } from "../helpers/constants"
import NonFungibleToken from "../models/NonFungibleToken"

export const getNonFungibleTokenPairs = async (options: { take: number, excludes: string }) => {
  const { take, excludes }= options

  const lowestVotes = await NonFungibleToken.findOne({ type: "azuki" }).sort({ votes: ORDER_BY["asc"] })
  const nextPairs = await NonFungibleToken.aggregate([
    { $match: { votes: lowestVotes.votes, _id: { $nin: excludes ? excludes.split(",") : [] } } },
    { $sample: { size: Number(take) } },
  ])

  const pairs = nextPairs.map((object) => ({
    ...object,
    _id: object._id.toString()
  }))

  return pairs
}