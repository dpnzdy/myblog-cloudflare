import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { categoryNames, getPublishedPosts, postUrl } from '../lib/content';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
})[char] ?? char);

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const posts = await getPublishedPosts();
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];
  const staticPaths = ['/', '/posts/', '/categories/', '/tags/', '/about/'];
  const categoryPaths = Object.keys(categoryNames)
    .filter((category) => posts.some((post) => post.data.category === category))
    .map((category) => `/categories/${category}/`);
  const tagPaths = tags
    .filter((tag) => posts.filter((post) => post.data.tags.includes(tag)).length >= 2)
    .map((tag) => `/tags/${encodeURIComponent(tag)}/`);
  const staticEntries: Array<{ path: string; lastmod?: Date }> = [...staticPaths, ...categoryPaths, ...tagPaths].map((path) => ({ path }));
  const postEntries: Array<{ path: string; lastmod?: Date }> = posts.map((post) => ({
    path: postUrl(post),
    lastmod: post.data.updatedAt ?? post.data.publishedAt,
  }));
  const urls = [...staticEntries, ...postEntries].map(({ path, lastmod }) => {
    const modified = lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : '';
    return `<url><loc>${escapeXml(new URL(path, base).toString())}</loc>${modified}</url>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
