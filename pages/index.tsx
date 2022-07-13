import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { Header, Footer } from '../components'

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
    <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col px-5">
      <Header className="p-5" />
      <section className="space-y-3">
        {posts.map((post, index) => (
          <Link href={'/blog/' + post.slug} passHref key={index}>
            <div className="card pointer mb-3 w-full cursor-pointer rounded border p-5 shadow-sm duration-100 ease-in-out hover:transform-cpu hover:shadow-inner dark:border-slate-400 md:hover:scale-105">
              <h2 className="font-bold">{post.frontMatter.title}</h2>
              <p className="text-gray-500">{post.frontMatter.description}</p>
              <p className="text-gray-500">
                <small className="text-muted">{post.frontMatter.date}</small>
              </p>
            </div>
          </Link>
        ))}
      </section>

      <Footer className="mt-auto" />
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
