import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
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

      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
  </div>
  </Layout>
)

export default IndexPage
