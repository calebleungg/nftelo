import axios from 'axios'
import cn from "classnames"
import { useState } from 'react'
import { calculateElo } from '../helpers/elo'
import { API_ROUTES } from '../helpers/routes'
import { NonFungibleTokenType } from '../interfaces/types'
import Card from './Card'

type Props = {
  pairs: NonFungibleTokenType[]
}

const EloScore = (props: { score: number }) => (
  <h2 className={cn(
    "absolute text-2xl font-black left-1/2 top-10 animate-float-up", {
      "text-green-600": props.score > 0,
      "text-red-600": props.score < 0
    }
  )}> {props.score > 0 ? `+${props.score.toFixed(0)}` : props.score.toFixed(0)} </h2>
)

const Vote = ({ pairs }: Props) => {
  const [backlog, setBacklog] = useState(pairs.slice(2, pairs.length))
  const [comparison, setComparison] = useState(pairs.slice(0, 2))
  const [loading, setLoading] = useState(false)
  const [scores, setScores] = useState({ show: false, one: 0, two: 0 })
  const one = comparison[0]
  const two = comparison[1]

  const handleVote = async (winner: string): Promise<void> => {
    const wToken = winner === "one" ? one : two
    const lToken = winner === "one" ? two : one

    // these control the vote animations, so we'll fire off first
    setLoading(true)
    const { winnerEloIncrement, loserEloIncrement } = calculateElo(wToken.elo, lToken.elo)
    setScores({
      show: true,
      one: winner === "one" ? winnerEloIncrement : loserEloIncrement,
      two: winner === "one" ? loserEloIncrement : winnerEloIncrement
    })

    // executing the vote + handling state / backend
    const excludedIds = [
      ...backlog.map(({ _id }) => _id),
      ...comparison.map(({ _id }) => _id)
    ].join(",")
    const { data: { data: nextPair } } = await axios.get(API_ROUTES.PAIRS + `?take=2&excludes${excludedIds}`)
    setBacklog([...backlog.slice(2, backlog.length), ...nextPair])
    setTimeout(() => setComparison(backlog.slice(0, 2)), 500)
    await axios.put(API_ROUTES.VOTE, { winnerId: wToken._id, loserId: lToken._id })

    // cleanup the animations
    setTimeout(() => setScores({ show: false, one: 0, two: 0 }), 1100)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
      <div className="relative">
        {scores.show && <EloScore score={scores.one} />}
        <Card token={one} loading={loading} handleClick={() => handleVote("one")} />
      </div>
      <div className="relative">
        {scores.show && <EloScore score={scores.two} />}
        <Card token={two} loading={loading} handleClick={() => handleVote("two")} />
      </div>
    </div>
  )
}

export default Vote
