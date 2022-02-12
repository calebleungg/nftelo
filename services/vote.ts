import { ORDER_BY } from "../helpers/constants"
import { calculateElo } from "../helpers/elo"
import NonFungibleToken from "../models/NonFungibleToken"

export const getVoteFloor = async () => {
  const lowestVoteToken = await NonFungibleToken
    .findOne({ type: "azuki" })
    .sort({ votes: ORDER_BY["asc"] })

  return lowestVoteToken.votes
}

export const processEloForVote = async (winnerId: string, loserId: string) => {
  const voteFloor = await getVoteFloor()
  
  // we check that the token is at the vote floor
  // if not - ineligable for another vote until they are
  const [winnerToken, loserToken] = await Promise.all([
    NonFungibleToken.findOne({ _id: winnerId, votes: voteFloor }),
    NonFungibleToken.findOne({ _id: loserId, votes: voteFloor })
  ])

  if (!winnerToken || !loserToken) {
    throw "Couldn't find eligible token for voting"
  }

  const { newEloRatingWinner, newEloRatingLoser } = calculateElo(winnerToken.elo, loserToken.elo)

  await Promise.all([
    NonFungibleToken.updateOne({ _id: winnerToken.id }, { elo: newEloRatingWinner, votes: winnerToken.votes + 1 }),
    NonFungibleToken.updateOne({ _id: loserToken.id }, { elo: newEloRatingLoser, votes: loserToken.votes + 1 })
  ])
}