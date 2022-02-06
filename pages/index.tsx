import { useState } from 'react'
import Layout from '../components/Layout'
import Vote from '../components/Vote'
import { parseCollection } from '../helpers'
import { NonFungibleTokenType } from '../interfaces/types'
import dbConnect from "../lib/dbConnect"
import NonFungibleToken from '../models/NonFungibleToken'
import { getNextPair } from './api/queries'

type Props = {
  pair: NonFungibleTokenType[]
}

const IndexPage = ({ pair }: Props) => {
  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Drive"}>
      <Vote pair={pair} />
    </Layout>
  )
}

const findPair = async () => {
  const result = await NonFungibleToken.find({ type: "azuki" }).sort({ votes: 1 }).limit(2)

  return parseCollection(result)
}

export async function getServerSideProps() {
  await dbConnect()

  const pair = await findPair()
  return { props: { pair }}
}

export default IndexPage
