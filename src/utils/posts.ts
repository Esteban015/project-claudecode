import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export function getReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getPostHref(post: CollectionEntry<'posts'>): string {
  const { publishedAt } = post.data;
  const year = publishedAt.getFullYear();
  const month = String(publishedAt.getMonth() + 1).padStart(2, '0');
  return `/blog/${year}/${month}/${post.slug}`;
}

export function getAllTags(posts: CollectionEntry<'posts'>[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(posts: CollectionEntry<'posts'>[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const cat = post.data.category;
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
