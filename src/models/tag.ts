import { z } from 'zod';

export const TagSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  slug: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;
