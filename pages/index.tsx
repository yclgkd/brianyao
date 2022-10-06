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
        <title>{`Brian Yao's blog`}</title>
      </Head>
      <Header />
      <section className="space-y-3">
        {posts.map((post, index) => (
          <div key={index}>
            <Link href={'/blog/' + post.slug} passHref>
              <a className="inline-block w-full cursor-pointer space-y-1 py-3 [&>h2]:hover:text-gray-700 [&>h2]:dark:hover:text-gray-100 [&>p]:hover:text-gray-700 [&>p]:dark:hover:text-gray-300">
                <h2 className="text-xl font-bold">{post.frontMatter.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{post.frontMatter.description}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  <small className="text-muted">{post.frontMatter.date}</small>
                </p>
              </a>
            </Link>
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
