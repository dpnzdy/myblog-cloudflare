export const SITE = {
  name: '기술 생활 기록',
  description: 'IT 제품 리뷰와 Ubuntu, Python, Codex 활용법을 직접 확인하고 정리합니다.',
  url: process.env.SITE_URL ?? 'https://myblog-cloudflare.pages.dev',
  locale: 'ko_KR',
  language: 'ko',
  author: '블로그 운영자',
  contactEmail: process.env.CONTACT_EMAIL ?? 'dpnzdy@gmail.com',
  defaultImage: '/og-default.png',
} as const;
