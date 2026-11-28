import { publishedPosts } from './posts';
import { appPath, articlePath, blogPath, homePath, languages, topicPath } from './site';

export async function sitemapEntries(site: URL | undefined) {
  if (!site || __BLOCK_INDEXING__) return [];

  const posts = await publishedPosts();
  const paths = new Map<string, string | undefined>();
  for (const lang of languages) {
    for (const path of [homePath(lang), blogPath(lang), appPath(lang)]) paths.set(path, undefined);
  }
  for (const { data } of posts) {
    paths.set(topicPath(data.lang, data.category), undefined);
    paths.set(articlePath(data.lang, data.slug), (data.updated ?? data.published).toISOString().slice(0, 10));
  }

  return Array.from(paths, ([path, lastmod]) => ({ url: new URL(path, site).href, lastmod }));
}
