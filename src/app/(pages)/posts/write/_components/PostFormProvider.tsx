'use client';

import { createContext, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostFormData, PostFormSchema } from '@/schemas/forms/post.form.schema';

const defaultValues: PostFormData = {
  title: '',
  content: '',
  excerpt: '',
  meta_description: '',
  seo_title: '',
  category_id: null,
  tags: [],
  featured_image: '',
  og_image: '',
  is_published: true,
};

export const PostFormContext = createContext<ReturnType<
  typeof useForm<PostFormData>
> | null>(null);

export function PostFormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<PostFormData>({
    resolver: zodResolver(PostFormSchema),
    defaultValues,
  });

  return (
    <PostFormContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </PostFormContext.Provider>
  );
}

export const usePostForm = () => {
  const context = useContext(PostFormContext);
  if (!context) {
    throw new Error('usePostForm must be used within a PostFormProvider');
  }
  return context;
};
