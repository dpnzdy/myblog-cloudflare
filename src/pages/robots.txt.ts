import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', base)}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
