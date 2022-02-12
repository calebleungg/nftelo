import Image from 'next/image'
import { NonFungibleTokenType } from '../interfaces/types'

type Props = {
  token: NonFungibleTokenType,
  loading: boolean,
  handleClick: () => void,
}

const Card = ({ token, loading, handleClick }: Props) => (
  <div className={`cursor-pointer md:w-128 md:h-128 md:hover:scale-105 duration-300 ${loading ? 'animate-fade-out' : 'animate-fade-in'}`} onClick={handleClick}>
    <h3 className="text-2xl font-bold mb-2">
      { token.name }
    </h3>
      <div className="w-80 h-80 md:w-96 md:h-96 2xl:w-full 2xl:h-full bg-slate-700 rounded-lg">
        <img className="rounded-lg shadow-2xl w-full h-full" src={token.image} />
      </div>
    <button className="bg-cyan-500 text-slate-100 w-full md:w-96 2xl:w-full p-2 bg-slate-100 text-slate-800 mt-2 rounded-md shadow-xl font-bold">Vote</button>
  </div>
)

export default Card
