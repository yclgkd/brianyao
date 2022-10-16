import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Header, Footer } from '../../components'
import Head from 'next/head'
import * as Config from '@/config'

const components = { SyntaxHighlighter }

type PostPageProps = {
  frontMatter: {
    title: string
    description: string
    date: string
    tags: string[]
  }
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

const PostPage = ({ frontMatter: { title, description, date }, mdxSource }: PostPageProps) => {
  return (
    <div className="blog-container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={Config.BLOG_TITLE} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={Config.BLOG_AUTHOR_AVATAR} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={Config.BLOG_AUTHOR_TWITTER_USERNAME} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={Config.BLOG_AUTHOR_AVATAR} />
      </Head>
      <Header />
      <div className="py-3">
        <h1 className="mb-2 text-5xl">{title}</h1>
        <article className="prose dark:prose-invert">
          <MDXRemote {...mdxSource} components={components} />
        </article>
      </div>
      <Footer />
    </div>
  )
}

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('_posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

type GetStaticProps = {
  params: {
    slug: string
  }
}
const getStaticProps = async ({ params: { slug } }: GetStaticProps) => {
  const markdownWithMeta = fs.readFileSync(path.join('_posts', slug + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export { getStaticProps, getStaticPaths }
export default PostPage
