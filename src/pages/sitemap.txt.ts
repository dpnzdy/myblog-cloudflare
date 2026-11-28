import type { APIRoute } from 'astro';
import { sitemapEntries } from '../lib/sitemap';

export const GET: APIRoute = async ({ site }) => {
  const entries = await sitemapEntries(site);
  const lines = entries.map(({ url }) => url);
  return new Response(lines.length ? lines.join('\n') + '\n' : '', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
