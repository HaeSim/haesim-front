// src/app/(routes)/posts/write/page.tsx
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('카테고리를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('카테고리를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
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
          slug: data.title.toLowerCase().replace(/ /g, '-'),
        }),
      });

      if (!response.ok) {
        throw new Error('포스트 작성에 실패했습니다.');
      }

      const result = await response.json();
      toast.success('포스트가 성공적으로 작성되었습니다.');
      router.push('/posts');
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('포스트 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-6'>
        <h1 className='text-3xl font-bold mb-6'>새 포스트 작성</h1>
        <div className='animate-pulse'>
          <div className='h-8 bg-secondary rounded w-1/4 mb-4'></div>
          <div className='h-32 bg-secondary rounded mb-4'></div>
          <div className='h-8 bg-secondary rounded w-1/3'></div>
        </div>
      </div>
    );
  }

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
