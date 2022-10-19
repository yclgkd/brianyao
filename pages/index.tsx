import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { Header, Footer } from '../components'
import Script from 'next/script'
import Head from 'next/head'
import * as Config from '@/config'
import { generateRssFeed } from '@/utils'

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
        <meta
          name="keywords"
          content="Brian Yao, Brian, Blog, 个人网站, Web 前端, JavaScript, CSS, HTML"
        />
        <meta name="description" content={Config.BLOG_DESCRIPTION} />
        <meta name="robots" content="follow, index" />
        <meta property="og:site_name" content={Config.BLOG_TITLE} />
        <meta property="og:title" content={Config.BLOG_TITLE} />
        <meta property="og:description" content={Config.BLOG_DESCRIPTION} />
        <meta property="og:image" content={Config.BLOG_AUTHOR_AVATAR} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={Config.BLOG_AUTHOR_TWITTER_USERNAME} />
        <meta name="twitter:title" content={Config.BLOG_TITLE} />
        <meta name="twitter:description" content={Config.BLOG_DESCRIPTION} />
        <meta name="twitter:image" content={Config.BLOG_AUTHOR_AVATAR} />
      </Head>
      <Header />
      <section className="space-y-3">
        {posts.map((post, index) => (
          <div key={index} className="space-y-1 py-3">
            <Link href={'/blog/' + post.slug} passHref>
              <a className="inline-block w-full cursor-pointer space-y-1 [&>h2]:hover:text-gray-700 [&>h2]:dark:hover:text-gray-100 [&>p]:hover:text-gray-700 [&>p]:dark:hover:text-gray-300">
                <h2 className="text-xl font-bold">{post.frontMatter.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{post.frontMatter.description}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  <small>
                    <time dateTime={post.frontMatter.date} className="text-muted">
                      {post.frontMatter.date}
                    </time>
                  </small>
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
  await generateRssFeed()
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
