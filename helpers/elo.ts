const ELO_CONSTANT = 400
const ELO_K_FACTOR = 32

// elo algorithm is from this -> https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/
export const calculateElo = (winnerElo: number, loserElo: number) => {
  const transformedRatingWinner = Math.pow(10, winnerElo / ELO_CONSTANT)
  const transformedRatingLoser = Math.pow(10, loserElo / ELO_CONSTANT)

  const expectedScoreWinner = transformedRatingWinner / (transformedRatingWinner + transformedRatingLoser)
  const expectedScoreLoser = transformedRatingLoser / (transformedRatingWinner + transformedRatingLoser)

  const newEloRatingWinner = winnerElo + ELO_K_FACTOR * (1 - expectedScoreWinner)
  const newEloRatingLoser = loserElo + ELO_K_FACTOR * (0 - expectedScoreLoser)

  return {
    newEloRatingWinner,
    newEloRatingLoser,
    winnerEloIncrement: ELO_K_FACTOR * (1 - expectedScoreWinner),
    loserEloIncrement: ELO_K_FACTOR * (0 - expectedScoreLoser)
  }
}