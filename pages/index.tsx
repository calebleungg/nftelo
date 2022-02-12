import Layout from '../components/Layout'
import Vote from '../components/Vote'
import { NonFungibleTokenType } from '../interfaces/types'
import dbConnect from '../lib/dbConnect'
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
  await dbConnect()

  const pairs = await getNonFungibleTokenPairs({ take: 6, excludes: null })
  return { props: { pairs }}
}

export default IndexPage
