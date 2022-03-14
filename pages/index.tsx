import type { NextPage } from 'next'
import Head from 'next/head'
import { getSortedPostsData } from '../lib/handlePostData'
import Header from '../components/header'
import Footer from '../components/footer'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const Home: NextPage<Record<string, any[]>> = ({ allPostsData }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col px-5">
      <Head>
        <title>Brian Yao</title>
        <meta name="description" content="Brian Yao's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </main>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Home
