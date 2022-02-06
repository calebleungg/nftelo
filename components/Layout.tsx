import Head from 'next/head'
import Link from 'next/link'

type Props = {
  children: React.ReactNode,
  title: string
}

const Layout = ({ children, title }: Props) => (
  <div className="flex min-h-screen flex-col py-32 px-40 bg-slate-900 text-slate-100">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="w-full" >
      <div className="mb-8">
        <h1 className="text-6xl font-extrabold"><span className="text-cyan-400">Non Fungible Elo</span></h1>
        <h3 className="text-2xl font-bold">A community driven ranking system, for your favourite NFT collections.</h3>
      </div>
      <div className="grid grid-cols-5 gap-x-6">
        <div className="col-span-1 flex gap-y-4 flex-col">
          <div className="bg-slate-700 shadow-lg py-4 pl-4 pr-10 rounded-lg flex flex-col gap-4 h-fit w-fit">
            <h2 className="hover:text-cyan-400 cursor-pointer text-lg font-bold">Collection: Azuki</h2>
          </div>
          <div className="bg-slate-700 shadow-lg py-6 pl-4 pr-10 rounded-lg flex flex-col gap-4 h-fit w-fit">
            <Link href="/"><h2 className="hover:text-cyan-400 cursor-pointer text-xl font-bold">Cast Your Vote</h2></Link>
            <Link href="/leaderboard"><h2 className="hover:text-cyan-400 cursor-pointer text-xl font-bold">Leaderboard</h2></Link>
          </div>
        </div>
        <div className="flex flex-col col-span-4 items-start">
          { children }
        </div>
      </div>
    </div>
  </div>
)

export default Layout
