import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { API_ROUTES } from '../helpers/routes'
import { NonFungibleTokenType } from '../interfaces/types'

type Props = {
  pairs: NonFungibleTokenType[]
}

// the prop will actually be 2 pairs 
// one current, one next
const Vote = ({ pairs }: Props) => {
  const [backlog, setBacklog] = useState(pairs.slice(2, pairs.length))
  const [comparison, setComparison] = useState(pairs.slice(0, 2))
  const [loading, setLoading] = useState(true)
  const one = comparison[0]
  const two = comparison[1]

  const handleVote = async (vote): Promise<void> => {
    setLoading(true)
    const excludedIds = [
      ...backlog.map(({ _id }) => _id),
      ...comparison.map(({ _id }) => _id)
    ].join(",")

    setComparison(backlog.slice(0, 2))
    const { data: { data: nextPair } } = await axios.get(API_ROUTES.PAIRS + `?take=2&excludes${excludedIds}`)
    setBacklog([...backlog.slice(2, backlog.length), ...nextPair])

    await axios.put(API_ROUTES.VOTE, { winnerId: vote.winnerId, loserId: vote.loserId })
    setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
      <div className="cursor-pointer md:w-128 md:h-128" onClick={() => handleVote({ winnerId: one._id, loserId: two._id })}>
        <h3 className="text-2xl font-bold mb-2">
          {loading
            ? <div className="h-full bg-slate-700 w-40 rounded-md animate-pulse text-slate-700">...</div>
            : one.name}
        </h3>
        {loading
          ? <div className="md:w-96 md:h-96 2xl:w-full 2xl:h-full bg-slate-700 rounded-lg text-slate-700 animate-pulse">...</div>
          : <div className="md:w-96 md:h-96 2xl:w-full 2xl:h-full bg-slate-700 rounded-lg">
              <img className="rounded-lg shadow-2xl w-full h-full" src={one.image} />
            </div>}
        <button className="bg-cyan-500 text-slate-100 w-full md:w-96 2xl:w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
      </div>
      <div className="cursor-pointer md:w-128 md:h-128" onClick={() => handleVote({ winnerId: two._id, loserId: one._id })}>
        <h3 className="text-2xl font-bold mb-2">
          {loading
              ? <div className="h-full bg-slate-700 w-40 rounded-md animate-pulse text-slate-700">...</div>
            : two.name}
        </h3>
        {loading
          ? <div className="md:w-96 md:h-96 2xl:w-full 2xl:h-full bg-slate-700 rounded-lg text-slate-700 animate-pulse">...</div>
          : <div className="md:w-96 md:h-96 2xl:w-full 2xl:h-full bg-slate-700 rounded-lg">
              <img className="rounded-lg shadow-2xl w-full h-full" src={two.image} />
            </div>}
        <button className="bg-cyan-500 text-slate-100 w-full md:w-96 2xl:w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
      </div>
    </div>
  )
}

export default Vote
