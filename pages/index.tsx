import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { Header, Footer } from '../components'
import Script from 'next/script'
import Head from 'next/head'

type Props = {
  posts: {
    frontMatter: {
      [key: string]: any
    }
    slug: string
  }[]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="blog-container">
      <Head>
        <title>Brian Yao{"'"}s blog</title>
      </Head>
      <Header />
      <section className="space-y-3">
        {posts.map((post, index) => (
          <Link href={'/blog/' + post.slug} passHref key={index}>
            <div className="mb-3 w-full cursor-pointer space-y-1 px-5 py-3">
              <h2 className="text-xl font-bold">{post.frontMatter.title}</h2>
              <p className="text-gray-500">{post.frontMatter.description}</p>
              <p className="text-gray-500">
                <small className="text-muted">{post.frontMatter.date}</small>
              </p>
              <div className="flex flex-row flex-wrap space-x-2">
                {post.frontMatter.tags?.map((i: string, index: number) => (
                  <div
                    className="rounded-sm bg-slate-500 px-2 text-center text-sm text-white"
                    key={index}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
      <Script
        id="cheat-wappalyzer"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.__remixContext = ''
          window.$ = { fn: { jquery: '3.6.1' } }
          window.wixBiSession = ''
          window.wixPerformanceMeasurements = ''
          window.Squarespace = ''
          window.Static = {'SQUARESPACE_CONTEXT': { 'templateVersion': '7' }}`
        }}
      />
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('_posts'))

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('_posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })

  return {
    props: {
      posts
    }
  }
}

export default Home
