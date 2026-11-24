import { getCollection, type CollectionEntry } from 'astro:content';
import { articlePath, type Language, type LanguageLinks } from './site';

export type Post = CollectionEntry<'blog'>;

export async function publishedPosts() {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  const paths = new Set<string>();
  const translations = new Set<string>();

  for (const { data } of entries) {
    const path = articlePath(data.lang, data.slug);
    const translation = `${data.lang}:${data.translationKey}`;
    if (paths.has(path)) throw new Error(`Duplicate blog URL: ${path}`);
    if (translations.has(translation)) throw new Error(`Duplicate translation: ${translation}`);
    if (data.updated && data.updated < data.published) {
      throw new Error(`Updated date precedes publication: ${path}`);
    }
    paths.add(path);
    translations.add(translation);
  }

  return entries.sort((a, b) =>
    b.data.published.getTime() - a.data.published.getTime() ||
    a.data.translationKey.localeCompare(b.data.translationKey),
  );
}

export function localPosts(posts: Post[], lang: Language) {
  return posts.filter(({ data }) => data.lang === lang);
}

export function translationsFor(posts: Post[], key: string): LanguageLinks {
  return Object.fromEntries(posts
    .filter(({ data }) => data.translationKey === key)
    .map(({ data }) => [data.lang, articlePath(data.lang, data.slug)]));
}

export const postImages = {
  rtf: { path: '/images/rtf.webp', width: 960, height: 640 },
  offline: { path: '/images/offline.webp', width: 960, height: 640 },
  editor: { path: '/images/app-editor.webp', width: 1600, height: 1000 },
};
