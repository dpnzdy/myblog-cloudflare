import { getCollection, type CollectionEntry } from 'astro:content';

export const categoryNames = {
  reviews: '제품 리뷰',
  ubuntu: 'Ubuntu',
  python: 'Python',
  codex: 'Codex',
} as const;

export type Category = keyof typeof categoryNames;
export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const now = new Date();
  const posts = await getCollection(
    'posts',
    ({ data }) => !data.draft && data.publishedAt <= now,
  );

  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function postUrl(post: Post): string {
  return `/posts/${post.id}/`;
}
