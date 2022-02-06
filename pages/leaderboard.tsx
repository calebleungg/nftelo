import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/Layout'
import dbConnect from "../lib/dbConnect"
import NonFungibleToken from '../models/NonFungibleToken'
import { GiAlliedStar } from "react-icons/gi"
import { IoMdPodium } from "react-icons/io"

type NFT = {
  _id: string,
  name: string,
  image: string,
  type: string,
  elo: number,
  rank: number,
}

type Props = {
  leaderboard: NFT[]
}

const PAGE_SIZE = 18

const LeaderboardPage = ({ leaderboard }: Props) => {
  const [page, setPage] = useState({ from: 0, to: PAGE_SIZE })
  const [listSection, setListSection] = useState(leaderboard.slice(page.from, page.to))

  const goToNextPage = () => {
    setPage({ from: page.from + PAGE_SIZE, to: page.to + PAGE_SIZE})
    setListSection(leaderboard.slice(page.from + PAGE_SIZE, page.to + PAGE_SIZE))
  }

  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Drive"}>
      <div className="grid grid-cols-3 gap-x-14 gap-y-6">
        { listSection.map((nft) => (
          <div key={nft._id} className="flex flex-row gap-x-4">
            <img className="w-20 rounded-lg shadow-xl" src={nft.image}/>
            <div>
              <p className="text-2x font-black">{nft.name}</p>
              <div className="font-extrabold">
                <div className="flex flex-row items-center gap-1 text-amber-400"><IoMdPodium /> {nft.rank}</div>
                <div className="flex flex-row items-center gap-1 text-cyan-400"><GiAlliedStar /> {nft.elo}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await NonFungibleToken.find({ type: "azuki" })
  const azukis = result.map((azuki, index) => ({
    ...azuki.toObject(),
    _id: azuki._id.toString(),
    rank: index + 1,
  }))

  return { props: { leaderboard: azukis }}
}

export default LeaderboardPage
