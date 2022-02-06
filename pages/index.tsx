import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import dbConnect from "../lib/dbConnect"
import NonFungibleToken from '../models/NonFungibleToken'

type Props = {
  azuki: {
    id: string,
    name: string,
    image: string,
    type: string,
    elo: number
  }
}

const IndexPage = ({ azuki }: Props) => {
  const choiceOne = azuki[0]
  const choiceTwo = azuki[1]
  return (
    <Layout title={"The Community's no.1 NFT Rating System | NFT Elo | Community Drive"}>
      <div className="grid grid-cols-3 gap-x-8">
        <div className="cursor-pointer hover:scale-105">
          <h3 className="text-2xl font-bold mb-2">{choiceOne.name}</h3>
          <img className="rounded-lg shadow-2xl" src={choiceOne.image} />
          <button className="box-border outline outline-2 outline-offset-1 outline-cyan-500 w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
        </div>
        <div className="cursor-pointer hover:scale-105">
          <h3 className="text-2xl font-bold mb-2">{choiceTwo.name}</h3>
          <img className="rounded-lg shadow-2xl" src={choiceTwo.image} />
          <button className="box-border outline outline-2 outline-offset-1 outline-cyan-500 w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const result = await NonFungibleToken.find({ type: "azuki" }).skip(100).limit(2)
  const azukis = result.map((azuki) => ({
    ...azuki.toObject(),
    _id: azuki._id.toString()
  }))
  console.log(azukis)

  return { props: { azuki: azukis }}
}

export default IndexPage
