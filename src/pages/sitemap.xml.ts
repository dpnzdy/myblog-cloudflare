import type { APIRoute } from 'astro';
import { publishedPosts } from '../lib/posts';
import { appPath, articlePath, blogPath, homePath, languages, topicPath } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const posts = await publishedPosts();
  const paths = new Map<string, string | undefined>();
  for (const lang of languages) {
    for (const path of [homePath(lang), blogPath(lang), appPath(lang)]) paths.set(path, undefined);
  }
  for (const { data } of posts) {
    paths.set(topicPath(data.lang, data.category), undefined);
    paths.set(articlePath(data.lang, data.slug), (data.updated ?? data.published).toISOString().slice(0, 10));
  }

  const urls = site && !__BLOCK_INDEXING__ ? [...paths].map(([path, lastmod]) =>
    `  <url><loc>${new URL(path, site).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
  ) : [];

  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
