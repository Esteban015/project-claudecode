import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getPostHref } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Mi Blog',
    description: 'Artículos sobre desarrollo web, tecnología y aprendizaje.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: getPostHref(post),
    })),
    customData: `<language>es</language>`,
  });
}
