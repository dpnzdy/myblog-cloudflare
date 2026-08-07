import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { getPublishedPosts, postUrl } from '../lib/content';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const base = site ?? new URL(SITE.url);
  const feedUrl = new URL('/rss.xml', base);
  const items = posts.map((post) => `<item><title>${escapeXml(post.data.title)}</title><description>${escapeXml(post.data.description)}</description><link>${new URL(postUrl(post), base)}</link><guid isPermaLink="true">${new URL(postUrl(post), base)}</guid><pubDate>${post.data.publishedAt.toUTCString()}</pubDate></item>`).join('');
  const lastBuildDate = posts[0]?.data.updatedAt ?? posts[0]?.data.publishedAt ?? new Date();
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(SITE.name)}</title><description>${escapeXml(SITE.description)}</description><link>${base}</link><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/><language>${SITE.language}</language><lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
