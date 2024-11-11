import { z } from 'zod';

export const PostTagSchema = z.object({
  post_id: z.bigint(),
  tag_id: z.bigint(),
});

export type PostTag = z.infer<typeof PostTagSchema>;
