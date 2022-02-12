import Head from 'next/head'
import Link from 'next/link'
import { MdOutlineHowToVote, MdLeaderboard } from "react-icons/md"
import { HiOutlineCollection } from "react-icons/hi"

type Props = {
  children: React.ReactNode,
  title: string
}

const Layout = ({ children, title }: Props) => (
  <div className="flex min-h-overflow flex-col px-6 py-10 md:py-32 md:px-40 bg-slate-900 text-slate-100">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="w-full" >
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold"><span className="text-cyan-400">Non Fungible Elo</span></h1>
        <h3 className="text-xl md:text-2xl font-bold">A community driven ranking system, for your favourite NFT collections.</h3>
      </div>
      <div className="md:grid md:grid-cols-12 2xl:grid-cols-5 gap-x-6">
        <div className="col-span-3 2xl:col-span-1 flex gap-y-4 flex-col">
          <div className="bg-slate-700 shadow-lg py-3 md:py-4 pl-4 pr-10 rounded-lg flex flex-col gap-4 h-fit w-fit">
            <h2 className="flex flex-row items-center gap-2 hover:text-cyan-400 cursor-pointer text-lg font-bold"><HiOutlineCollection />Collection: Azuki</h2>
          </div>
          <div className="flex md:flex-col gap-4 h-fit w-fit">
            <Link href="/" passHref><h2 className="flex flex-row items-center gap-2 hover:text-cyan-400 py-2 md:py-3 pl-4 pr-6 text-center rounded-lg bg-slate-700 cursor-pointer text-lg font-bold w-fit"><MdOutlineHowToVote/> Vote</h2></Link>
            <Link href="/leaderboard" passHref><h2 className="flex flex-row items-center gap-2 hover:text-cyan-400 py-2 md:py-3 pl-4 pr-6 text-center rounded-lg bg-slate-700 cursor-pointer text-lg font-bold w-fit"><MdLeaderboard/>Leaderboard</h2></Link>
          </div>
        </div>
        <div className="flex flex-col col-span-9 2xl:col-span-4 items-start py-6 md:py-0">
          { children }
        </div>
      </div>
    </div>
  </div>
)

export default Layout
