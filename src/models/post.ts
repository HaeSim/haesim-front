import { z } from 'zod';

export const PostSchema = z.object({
  id: z.bigint(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  meta_description: z.string().nullable(),
  featured_image: z.string().nullable(),
  author_id: z.bigint(),
  category_id: z.bigint().nullable(),
  published_at: z.date().nullable(),
  updated_at: z.date().nullable(),
  is_published: z.boolean().default(false),
  view_count: z.bigint().default(BigInt(0)),
  reading_time_minutes: z.number().nullable(),
  seo_title: z.string().nullable(),
  og_image: z.string().nullable(),
});

export type Post = z.infer<typeof PostSchema>;
