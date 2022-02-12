import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { GiAlliedStar } from "react-icons/gi"
import { IoMdPodium } from "react-icons/io"
import { LEADERBOARD_PAGE_SIZE } from '../helpers/constants'
import { API_ROUTES } from '../helpers/routes'
import { NonFungibleTokenType } from '../interfaces/types'

type Props = {
  leaderboard: NonFungibleTokenType[]
}

const Leaderboard = ({ leaderboard }: Props) => {
  const [page, _setPage] = useState(1)
  const pageRef = useRef(page)

  const [fetching, _setFetching] = useState(false)
  const fetchingRef = useRef(fetching)

  const [list, _setList] = useState(leaderboard)
  const listRef = useRef(list)

  const setPage = data => {
    pageRef.current = data
    _setPage(data)
  }

  const setFetching = data => {
    fetchingRef.current = data
    _setFetching(data)
  }

  const setList = data => {
    listRef.current = data
    _setList(data)
  }

  const fetchNextPage = async () => {
    if (!fetchingRef.current) {
      setFetching(true)

      const params = [
        `skip=${pageRef.current * LEADERBOARD_PAGE_SIZE}`,
        `take=${LEADERBOARD_PAGE_SIZE}`
      ].join("&")
      const { data: { data: nextPageOfTokens } } = await axios.get(API_ROUTES.TOKENS + "?" + params)
      setList([...listRef.current, ...nextPageOfTokens])
      setPage(pageRef.current + 1)

      setFetching(false)
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const rankedList = listRef.current.map((nft, index) => ({ ...nft, rank: index + 1 }))

  return (
    <div id="leaderboard-wrapper" className="grid md:grid-cols-3 gap-x-14 gap-y-6" onClick={handleScroll}>
      { rankedList.map((nft) => (
        <div key={nft._id} className="flex flex-row gap-x-4 animate-fade-in" onClick={fetchNextPage}>
          <div className="w-20 h-20 rounded-lg shadow-xl bg-slate-700">
            {nft.image && <img className="w-full h-full rounded-lg shadow-xl" src={nft.image}/>}
          </div>
          <div>
            <p className="text-2x font-black">{nft.name}</p>
            <div className="font-extrabold">
              <div className="flex flex-row items-center gap-1 text-amber-400"><IoMdPodium /> {nft.rank}</div>
              <div className="flex flex-row items-center gap-1 text-cyan-400"><GiAlliedStar /> {nft.elo.toFixed(0)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
