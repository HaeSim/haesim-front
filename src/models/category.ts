import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.bigint(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
});

export type Category = z.infer<typeof CategorySchema>;
