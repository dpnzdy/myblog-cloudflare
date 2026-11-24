import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories, languages } from './lib/site';

const urlPart = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    translationKey: urlPart,
    slug: urlPart.refine((value) => value !== 'topic', 'The slug topic is reserved.'),
    lang: z.enum(languages),
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(categories),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    minutes: z.number().int().positive(),
    image: z.enum(['rtf', 'offline', 'editor']),
    imageAlt: z.string().min(1),
    showApp: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
