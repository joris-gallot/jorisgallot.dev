import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { SITE } from '@consts'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  })
}
