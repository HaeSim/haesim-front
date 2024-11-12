'use client';

import { useEffect, useState } from 'react';
import { PostEditor } from '@/components/post/post-editor';
import { Category } from '@/models/category';
import { PostFormData } from '@/schemas/forms/post.form.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function BlogPostWritePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch categories from API
    setCategories([
      {
        id: BigInt(1),
        name: 'Technology',
        slug: 'technology',
        description: null,
      },
      {
        id: BigInt(2),
        name: 'Travel',
        slug: 'travel',
        description: null,
      },
      {
        id: BigInt(3),
        name: 'Food',
        slug: 'food',
        description: null,
      },
    ]);
  }, []);

  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          slug: data.title.toLowerCase().replace(/ /g, '-'), // 임시 slug 생성
        }),
      });

      if (!response.ok) {
        throw new Error('포스트 작성에 실패했습니다.');
      }

      const result = await response.json();
      toast.success('포스트가 성공적으로 작성되었습니다.');
      router.push('/posts'); // 포스트 목록으로 이동
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('포스트 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto py-6'>
      <h1 className='text-3xl font-bold mb-6'>새 포스트 작성</h1>
      <PostEditor
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
