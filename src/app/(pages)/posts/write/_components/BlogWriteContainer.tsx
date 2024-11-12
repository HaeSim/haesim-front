'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePostForm } from './PostFormProvider';

import { generateSlug } from '@/lib/utils';
import { PostFormData } from '@/schemas/forms/post.form.schema';
import PostEditor from './PostEditor';
import PostPreview from './PostPreview';

export function BlogWriteContainer() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit } = usePostForm();

  const handleFormSubmit = async (data: PostFormData) => {
    if (!data.title || !data.content) {
      toast.error('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          slug: generateSlug(data.title),
        }),
      });

      if (!response.ok) {
        throw new Error(
          (await response.json()).message || '포스트 작성에 실패했습니다.'
        );
      }

      toast.success('포스트가 성공적으로 저장되었습니다.');
      router.push('/posts');
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error instanceof Error ? error.message : '포스트 작성에 실패했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Tabs defaultValue='editor' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='editor'>에디터</TabsTrigger>
          <TabsTrigger value='preview'>미리보기</TabsTrigger>
        </TabsList>
        <TabsContent value='editor'>
          <PostEditor
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(handleFormSubmit)}
            onCancel={() => router.back()}
          />
        </TabsContent>
        <TabsContent value='preview'>
          <PostPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
