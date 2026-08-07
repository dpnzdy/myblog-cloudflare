import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

if (existsSync('.env')) process.loadEnvFile('.env');

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://myblog-cloudflare.pages.dev',
  output: 'static',
  integrations: [mdx()],
  trailingSlash: 'always',
});
