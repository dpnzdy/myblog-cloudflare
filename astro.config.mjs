import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

const envFile = new URL('.env', import.meta.url);
if (existsSync(envFile)) loadEnvFile(envFile);
const env = process.env;
const preview = Boolean(env.CF_PAGES_BRANCH && env.CF_PAGES_BRANCH !== 'main');
const origin = env.SITE_URL;
const analyticsUrl = env.PUBLIC_UMAMI_SCRIPT_URL;
const analyticsId = env.PUBLIC_UMAMI_WEBSITE_ID;

if (origin) {
  const url = new URL(origin);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTPS origin without a path.');
  }
}

if (Boolean(analyticsUrl) !== Boolean(analyticsId) || (analyticsUrl && new URL(analyticsUrl).protocol !== 'https:')) {
  throw new Error('Set both Umami variables and use an HTTPS script URL.');
}

export default defineConfig({
  site: origin,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    define: {
      __BLOCK_INDEXING__: JSON.stringify(preview || !origin),
      __ANALYTICS__: JSON.stringify(!preview && origin && analyticsUrl && analyticsId
        ? { url: analyticsUrl, id: analyticsId, domain: new URL(origin).hostname }
        : null),
    },
  },
});
