import type { APIRoute } from 'astro';
import { sitemapEntries } from '../lib/sitemap';

export const GET: APIRoute = async ({ site }) => {
  const entries = await sitemapEntries(site);
  const urls = entries.map(({ url, lastmod }) =>
    `  <url><loc>${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
  );

  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
