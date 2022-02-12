import Layout from '../components/Layout'
import dbConnect from "../lib/dbConnect"
import { NonFungibleTokenType } from '../interfaces/types'
import Leaderboard from '../components/Leaderboard'
import { LEADERBOARD_PAGE_SIZE } from '../helpers/constants'
import { getPaginatedTokens } from '../services/tokens'

interface NonFungibleTokenExtended extends NonFungibleTokenType {
  rank: number
}

type Props = {
  leaderboard: NonFungibleTokenExtended[]
}

const LeaderboardPage = ({ leaderboard }: Props) => {
  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Driven | Leaderboard Rankings"}>
      <Leaderboard leaderboard={leaderboard} />
    </Layout>
  )
}

export async function getStaticProps() {
  await dbConnect()

  const list = await getPaginatedTokens("azuki", 0, LEADERBOARD_PAGE_SIZE)
  return { props: { leaderboard: list }}
}

export default LeaderboardPage
