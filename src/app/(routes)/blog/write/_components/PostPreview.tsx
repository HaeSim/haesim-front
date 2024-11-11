// src/app/(routes)/blog/write/_components/PostPreview.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MarkdownViewer from '@/components/blog/markdown/markdown-viewer';
import { useFormContext } from 'react-hook-form';
import { PostFormData } from '@/schemas/forms/post.form.schema';

export default function PostPreview() {
  const { watch } = useFormContext<PostFormData>();

  const title = watch('title');
  const content = watch('content');

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>미리보기</CardTitle>
      </CardHeader>
      <CardContent className='prose dark:prose-invert max-w-none'>
        <h1>{title}</h1>
        <MarkdownViewer content={content} />
      </CardContent>
    </Card>
  );
}
