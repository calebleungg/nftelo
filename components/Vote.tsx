import { useState } from 'react'
import { NonFungibleTokenType } from '../interfaces/types'
import { getNextPair } from '../pages/api/queries'

type Props = {
  pair: NonFungibleTokenType[]
}

const Vote = ({ pair }: Props) => {
  const [comparison, setComparison] = useState(pair)
  const one = comparison[0]
  const two = comparison[1]

  const handleVote = async () => {
    const result = await getNextPair({ exclude: comparison.map((nft) => nft._id) })
    console.log(result.data.data)
    setComparison(result.data.data)
  }

  return (
    <div className="grid grid-cols-3 gap-x-8">
      <div className="cursor-pointer hover:scale-105" onClick={handleVote}>
        <h3 className="text-2xl font-bold mb-2">{one.name}</h3>
        <img className="rounded-lg shadow-2xl" src={one.image} />
        <button className="box-border outline outline-2 outline-offset-1 outline-cyan-500 w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
      </div>
      <div className="cursor-pointer hover:scale-105" onClick={handleVote}>
        <h3 className="text-2xl font-bold mb-2">{two.name}</h3>
        <img className="rounded-lg shadow-2xl" src={two.image} />
        <button className="box-border outline outline-2 outline-offset-1 outline-cyan-500 w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
      </div>
    </div>
  )
}

export default Vote
