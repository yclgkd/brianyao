import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Brian Yao</title>
        <meta name="description" content="Brian Yao's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <p>仍在开发中。。。</p>
      </main>
      <Footer />
    </div>
  )
}

export default Home
