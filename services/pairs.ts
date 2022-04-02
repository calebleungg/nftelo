import NonFungibleToken from "../models/NonFungibleToken"
import { getVoteFloor } from "./vote"

export const getNonFungibleTokenPairs = async (options: { take: number, excludes: string }) => {
  const { take, excludes } = options

  const voteFloor = await getVoteFloor()

  const nextPairs = await NonFungibleToken.aggregate([
    { $match: { votes: voteFloor, _id: { $nin: excludes ? excludes.split(",") : [] } } },
    { $sample: { size: Number(take) } },
  ])

  const pairs = nextPairs.map((object) => ({
    ...object,
    _id: object._id.toString()
  }))

  return pairs
}