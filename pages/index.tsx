import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

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
    <div className="mt-5">
      {posts.map((post, index) => (
        <Link href={'/blog/' + post.slug} passHref key={index}>
          <div className="card pointer mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.frontMatter.title}</h5>
                  <p className="card-text">{post.frontMatter.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{post.frontMatter.date}</small>
                  </p>
                </div>
              </div>
              <div className="col-md-4 m-auto">
                {/* <Image
                  src={post.frontMatter.thumbnailUrl}
                  className="img-fluid rounded-start mt-1"
                  alt="thumbnail"
                  width={500}
                  height={400}
                  objectFit="cover"
                /> */}
              </div>
            </div>
          </div>
        </Link>
      ))}
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
