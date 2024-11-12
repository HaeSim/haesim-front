'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostFormData, PostFormSchema } from '@/schemas/forms/post.form.schema';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/models/category';
import { useState } from 'react';
import useMediaQuery from '@/hooks/use-media-query';
import { PostFormFields } from './editor/post-form-fields';
import { PostPreview } from './editor/post-preview';

interface PostEditorProps {
  categories: Category[];
  onSubmit: (data: PostFormData) => void;
  isSubmitting: boolean;
}

export function PostEditor({
  categories,
  onSubmit,
  isSubmitting,
}: PostEditorProps) {
  const [preview, setPreview] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const form = useForm<PostFormData>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      meta_description: '',
      category_id: null,
      is_published: false,
      tags: [],
    },
  });

  const selectedCategory = categories.find(
    (cat) => Number(cat.id) === Number(form.watch('category_id'))
  );

  if (isMobile) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Tabs defaultValue='editor' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='editor'>에디터</TabsTrigger>
              <TabsTrigger value='preview'>미리보기</TabsTrigger>
            </TabsList>
            <TabsContent value='editor'>
              <PostFormFields
                form={form}
                categories={categories}
                isSubmitting={isSubmitting}
                onContentChange={setPreview}
              />
            </TabsContent>
            <TabsContent value='preview'>
              <Card>
                <CardContent className='p-6'>
                  <PostPreview
                    title={form.watch('title')}
                    content={preview}
                    category={selectedCategory?.name}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PostFormFields
            form={form}
            categories={categories}
            isSubmitting={isSubmitting}
            onContentChange={setPreview}
          />
        </form>
      </Form>

      <div className='sticky top-4'>
        <Card>
          <CardContent className='p-6'>
            <PostPreview
              title={form.watch('title')}
              content={preview}
              category={selectedCategory?.name}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
