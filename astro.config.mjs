import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { siteVerification } from './search-verification.mjs';

const envFile = new URL('.env', import.meta.url);
if (existsSync(envFile)) loadEnvFile(envFile);
const env = process.env;
const preview = Boolean(env.CF_PAGES_BRANCH && env.CF_PAGES_BRANCH !== 'main');
const pagesProduction = env.CF_PAGES === '1' && env.CF_PAGES_BRANCH === 'main';
// A deployment URL may have a hash prefix. Index the stable project hostname.
const pagesHost = env.CF_PAGES_URL?.match(/^https:\/\/(?:[a-z0-9-]+\.)?([a-z0-9-]+\.pages\.dev)\/?$/i)?.[1];
const origin = env.SITE_URL || (pagesProduction && pagesHost ? `https://${pagesHost}` : undefined);
const analyticsUrl = env.PUBLIC_UMAMI_SCRIPT_URL;
const analyticsId = env.PUBLIC_UMAMI_WEBSITE_ID;

const url = origin ? new URL(origin) : undefined;
if (url) {
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTPS origin without a path.');
  }
}

const verificationDefaults = url?.origin === siteVerification.origin ? siteVerification : {};
const searchVerification = {
  'google-site-verification': env.GOOGLE_SITE_VERIFICATION?.trim() ?? verificationDefaults.google,
  'msvalidate.01': env.BING_SITE_VERIFICATION?.trim() ?? verificationDefaults.bing,
  'naver-site-verification': env.NAVER_SITE_VERIFICATION?.trim() ?? verificationDefaults.naver,
};

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
      __SEARCH_VERIFICATION__: JSON.stringify(searchVerification),
      __ANALYTICS__: JSON.stringify(!preview && url && analyticsUrl && analyticsId
        ? { url: analyticsUrl, id: analyticsId, domain: url.hostname }
        : null),
    },
  },
});
