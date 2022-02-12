import axios from 'axios'
import { useState } from 'react'
import { API_ROUTES } from '../helpers/routes'
import { NonFungibleTokenType } from '../interfaces/types'
import Card from './Card'

type Props = {
  pairs: NonFungibleTokenType[]
}

// the prop will actually be 2 pairs 
// one current, one next
const Vote = ({ pairs }: Props) => {
  const [backlog, setBacklog] = useState(pairs.slice(2, pairs.length))
  const [comparison, setComparison] = useState(pairs.slice(0, 2))
  const [loading, setLoading] = useState(false)
  const one = comparison[0]
  const two = comparison[1]

  const handleVote = async (vote): Promise<void> => {
    setLoading(true)
    const excludedIds = [
      ...backlog.map(({ _id }) => _id),
      ...comparison.map(({ _id }) => _id)
    ].join(",")

    const { data: { data: nextPair } } = await axios.get(API_ROUTES.PAIRS + `?take=2&excludes${excludedIds}`)
    setBacklog([...backlog.slice(2, backlog.length), ...nextPair])
    setTimeout(() => setComparison(backlog.slice(0, 2)), 500)

    await axios.put(API_ROUTES.VOTE, { winnerId: vote.winnerId, loserId: vote.loserId })
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
      <Card token={one} loading={loading} handleClick={() => handleVote({ winnerId: one._id, loserId: two._id })} />
      <Card token={two} loading={loading} handleClick={() => handleVote({ winnerId: two._id, loserId: one._id })} />
    </div>
  )
}

export default Vote
