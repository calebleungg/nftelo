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

const IndexPage = ({ azuki }: Props) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-6xl font-bold">
        Ah Suh
        <a className="text-blue-600" href="https://rafflebuzz.com.au">
          Dud
        </a>
      </h1>
      <code>
        { JSON.stringify(azuki) }
      </code>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </div>
  </Layout>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  const result = await NonFungibleToken.find({ type: "azuki" }).limit(10)
  const azukis = result.map((azuki) => ({
    ...azuki.toObject(),
    _id: azuki._id.toString()
  }))
  console.log(azukis)

  return { props: { azuki: azukis }}
}

export default IndexPage
