import fs from 'fs'
import { Feed } from 'feed'
import * as Config from '@/config'
import path from 'path'
import matter from 'gray-matter'
import type { BlogFrontMatter } from '@/types/blog'

export async function generateRssFeed() {
  const siteURL = Config.BLOG_URL
  const date = new Date()
  const author = {
    name: Config.BLOG_AUTHOR,
    email: Config.BLOG_AUTHOR_EMAIL,
    link: Config.BLOG_AUTHOR_LINK
  }

  const feed = new Feed({
    title: Config.BLOG_TITLE,
    description: Config.BLOG_DESCRIPTION,
    id: Config.BLOG_URL,
    link: Config.BLOG_URL,
    image: Config.BLOG_ICON,
    favicon: Config.BLOG_ICON,
    copyright: `All rights reserved ${date.getFullYear()}, Brian Yao`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss.xml`
    },
    author
  })

  const files = fs.readdirSync(path.join('_posts'))

  type Post = {
    slug: string
    frontMatter: BlogFrontMatter
  }[]

  const posts = files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(path.join('_posts', filename), 'utf-8')
      const { data: frontMatter } = matter(markdownWithMeta)
      return {
        frontMatter,
        slug: filename.split('.')[0]
      }
    })
    .filter((post) => post.frontMatter.published !== false) as Post

  posts.forEach(({ frontMatter, slug }) => {
    const url = `${siteURL}/blog/${slug}`
    feed.addItem({
      title: frontMatter.title,
      id: url,
      link: url,
      description: frontMatter.description,
      content: frontMatter.description,
      author: [author],
      contributor: [author],
      date: new Date(frontMatter.date)
    })
  })

  fs.writeFileSync('./public/rss.xml', feed.rss2())
}
