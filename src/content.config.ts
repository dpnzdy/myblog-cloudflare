import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    author: z.string().default('블로그 운영자'),
    category: z.enum(['reviews', 'ubuntu', 'python', 'codex']),
    tags: z.array(z.string()).default([]),
    contentType: z.enum(['article', 'tutorial', 'review', 'comparison']),
    summary: z.string().min(1),
    featured: z.boolean().default(false),
    testedOn: z.array(z.string()).default([]),
    disclosure: z.object({
      hasAffiliateLinks: z.boolean(),
      isSponsored: z.boolean(),
      productProvided: z.boolean(),
      provider: z.string().optional(),
    }),
  }).refine(
    ({ publishedAt, updatedAt }) => !updatedAt || updatedAt >= publishedAt,
    { message: 'updatedAt은 publishedAt보다 빠를 수 없습니다.' },
  ).refine(
    ({ disclosure }) =>
      !(disclosure.isSponsored || disclosure.productProvided) || Boolean(disclosure.provider),
    { message: '협찬 또는 제품 제공 글에는 provider가 필요합니다.' },
  ),
});

export const collections = { posts };
