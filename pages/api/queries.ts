import axios from "axios"

const DEFAULT_PATH = "/api"

export const getNextPair = async (options: { exclude: string[] }) => {
  try {
    const queryOptions = [
      "skip=0",
      "take=2",
      "type=azuki",
      "sort=votes",
      "order=asc",
      `exclude=${options.exclude}`
    ]
    const result = await axios.get(`${DEFAULT_PATH}?${queryOptions.join("&")}`)
    return result
  } catch (error) {
    throw error
  }
}

// elo algorithm is from this -> https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/
export const calcEloForVote = async ({ winnerId, loserId }) => {
  await axios.post(DEFAULT_PATH, { winnerId, loserId })
}
