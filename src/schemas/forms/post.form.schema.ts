// src/schemas/forms/post.form.schema.ts
import { PostSchema } from '@/models/post';
import { z } from 'zod';

// Form에 필요한 부분만 추출하여 새로운 스키마 작성
// src/schemas/forms/post.form.schema.ts 수정
export const PostFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  excerpt: z.string().optional().default(''), // null 대신 optional string
  meta_description: z.string().optional().default(''),
  seo_title: z.string().optional().default(''),
  category_id: z.number().nullable(),
  tags: z.array(z.string()).default([]),
  featured_image: z.string().optional().default(''),
  og_image: z.string().optional().default(''),
  is_published: z.boolean().default(true),
});

// API 요청시 사용할 타입
export const PostCreateRequestSchema = PostFormSchema.extend({
  slug: z.string(),
});

// TypeScript 타입 추출
export type PostFormData = z.infer<typeof PostFormSchema>;
export type PostCreateRequest = z.infer<typeof PostCreateRequestSchema>;

// Validation messages
export const postFormMessages = {
  title: {
    required: '제목을 입력해주세요',
    min: '제목을 입력해주세요',
    max: '제목은 100자를 넘을 수 없습니다',
  },
  content: {
    required: '내용을 입력해주세요',
  },
  excerpt: {
    max: '요약은 200자를 넘을 수 없습니다',
  },
  meta_description: {
    max: '메타 설명은 160자를 넘을 수 없습니다',
  },
  seo_title: {
    max: 'SEO 제목은 60자를 넘을 수 없습니다',
  },
  featured_image: {
    url: '올바른 URL 형식이 아닙니다',
  },
  og_image: {
    url: '올바른 URL 형식이 아닙니다',
  },
} as const;

// Props 타입 정의
export interface PostEditorProps {
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
