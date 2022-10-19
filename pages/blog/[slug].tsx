import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Header, Footer } from '../../components'
import Head from 'next/head'
import * as Config from '@/config'
import rehypeHighlight from 'rehype-highlight'
import Script from 'next/script'
import type { BlogFrontMatter } from '@/types/blog'

type PostPageProps = {
  frontMatter: BlogFrontMatter
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

const PostPage = ({
  frontMatter: { title, description, date, tags },
  mdxSource
}: PostPageProps) => {
  const publishDate = new Date(date).toISOString()
  return (
    <div className="blog-container">
      <Head>
        <title>{title}</title>
        <meta
          name="keywords"
          content={
            tags.length
              ? tags.join(', ')
              : 'Brian Yao, Brian, Blog, 个人网站, Web 前端, JavaScript, CSS, HTML'
          }
        />
        <meta name="description" content={description} />
        <meta property="og:site_name" content={Config.BLOG_TITLE} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={Config.BLOG_AUTHOR_AVATAR} />
        <meta property="article:published_time" content={publishDate} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={Config.BLOG_AUTHOR_TWITTER_USERNAME} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={Config.BLOG_AUTHOR_AVATAR} />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
      </Head>
      <Header />
      <div className="py-3">
        <h1 className="mb-2 text-5xl">{title}</h1>
        <article className="prose dark:prose-invert">
          <MDXRemote {...mdxSource} />
        </article>
      </div>
      <Footer />
      <Script
        id="structured-data"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `

            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${title}",
              "image": "${Config.BLOG_AUTHOR_AVATAR}",
              "datePublished": "${publishDate}",
              "dateModified": "${publishDate}",
              "author": {
                "@type": "Person",
                "name": "${Config.BLOG_AUTHOR}"
              },
              "description": "${description}"
            }
            `
        }}
      />
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
  const mdxSource = await serialize(content, {
    // made available to the arguments of any custom mdx component
    scope: {},
    // MDX's available options, see the MDX docs for more info.
    // https://mdxjs.com/packages/mdx/#compilefile-options
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight],
      format: 'mdx'
    },
    // Indicates whether or not to parse the frontmatter from the mdx source
    parseFrontmatter: false
  })
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
