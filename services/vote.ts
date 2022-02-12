import NonFungibleToken from "../models/NonFungibleToken"

const ELO_CONSTANT = 400
const ELO_K_FACTOR = 32

export const processEloForVote = async (winnerId: string, loserId: string) => {
  // elo algorithm is from this -> https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/
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
}