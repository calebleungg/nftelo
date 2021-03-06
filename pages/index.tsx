import Layout from '../components/Layout'
import Vote from '../components/Vote'
import { NonFungibleTokenType } from '../interfaces/types'
import dbConnect from '../lib/dbConnect'
import logger from '../lib/logger'
import { getNonFungibleTokenPairs } from '../services/pairs'

type Props = {
  pairs: NonFungibleTokenType[]
}

const IndexPage = ({ pairs }: Props) => {
  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Driven | Vote Now!"}>
      <Vote pairs={pairs} />
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    logger.info({ path: "/" })

    await dbConnect()
    const pairs = await getNonFungibleTokenPairs({ take: 6, excludes: null })
    return { props: { pairs }}
  } catch (error) {
    logger.error({ path: "/", error })
    throw error
  }
}

export default IndexPage
