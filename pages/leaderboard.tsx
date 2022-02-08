import { useState } from 'react'
import Layout from '../components/Layout'
import dbConnect from "../lib/dbConnect"
import NonFungibleToken from '../models/NonFungibleToken'
import { GiAlliedStar } from "react-icons/gi"
import { IoMdPodium } from "react-icons/io"
import { NonFungibleTokenType } from '../interfaces/types'
import Image from "next/image"

interface NonFungibleTokenExtended extends NonFungibleTokenType {
  rank: number
}

type Props = {
  leaderboard: NonFungibleTokenExtended[]
}

const PAGE_SIZE = 24
const MAX_COUNT = 10000

const LeaderboardPage = ({ leaderboard }: Props) => {
  const [page, setPage] = useState({ from: 0, to: PAGE_SIZE })
  const [listSection, setListSection] = useState(leaderboard.slice(page.from, page.to))

  const handleNext = () => {
    if (page.to < MAX_COUNT) {
      setPage({ from: page.from + PAGE_SIZE, to: page.to + PAGE_SIZE})
      setListSection(leaderboard.slice(page.from + PAGE_SIZE, page.to + PAGE_SIZE))
    }
  }

  const handlePrevious = () => {
    if (page.from === 0) {
      return;
    }
    setPage({ from: page.from - PAGE_SIZE, to: page.to - PAGE_SIZE})
    setListSection(leaderboard.slice(page.from - PAGE_SIZE, page.to - PAGE_SIZE))
  }

  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Driven | Leaderboard Rankings"}>
      <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-x-14 gap-y-6">
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
        <div className="flex flex-row gap-2 md:col-span-3 2xl:col-span-4 w-full justify-end">
          {page.from > 0 && (
            <button
              onClick={handlePrevious}
              className="box-border outline outline-2 outline-offset-1 outline-slate-700 py-2 px-4 bg-slate-100 text-slate-800 rounded-md shadow-xl font-bold text-sm"
            >Previous</button>
          )}
          <button
            onClick={handleNext}
            className="box-border outline outline-2 outline-offset-1 outline-slate-700 py-2 px-4 bg-slate-100 text-slate-800 rounded-md shadow-xl font-bold text-sm"
          >Next</button>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await NonFungibleToken.find({ type: "azuki" }).sort({ elo: -1 })
  const azukis = result.map((azuki, index) => ({
    ...azuki.toObject(),
    _id: azuki._id.toString(),
    rank: index + 1,
  }))

  return { props: { leaderboard: azukis }}
}

export default LeaderboardPage
