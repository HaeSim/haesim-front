import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.bigint(),
  email: z.string().email(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  bio: z.string().nullable(),
  created_at: z.date().nullable(),
});

export type Author = z.infer<typeof AuthorSchema>;
