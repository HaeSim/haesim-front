'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

// Schema & Types
import {
  PostFormData,
  PostFormSchema,
  PostEditorProps,
} from '@/schemas/forms/post.form.schema';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dynamic import for MDEditor
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function PostEditor({
  isSubmitting = false,
  onSubmit,
  onCancel,
}: PostEditorProps) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      seo_title: '',
      meta_description: '',
      featured_image: '',
      og_image: '',
      category_id: undefined,
      tags: [],
      is_published: false,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form;

  // Tag management
  const tags = watch('tags');
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setValue('tags', [...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>새 포스트 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            {/* Title Field */}
            <FormField
              control={control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder='포스트 제목을 입력하세요' {...field} />
                  </FormControl>
                  <FormMessage>{errors.title?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={control}
              name='category_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='카테고리 선택' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1'>개발</SelectItem>
                      <SelectItem value='2'>일상</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{errors.category_id?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Content Field */}
          <FormField
            control={control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <div data-color-mode='light'>
                    <MDEditor
                      value={field.value}
                      onChange={field.onChange}
                      height={400}
                      preview='edit'
                    />
                  </div>
                </FormControl>
                <FormMessage>{errors.content?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Excerpt Field */}
          <FormField
            control={control}
            name='excerpt'
            render={({ field }) => (
              <FormItem>
                <FormLabel>요약</FormLabel>
                <FormControl>
                  <Textarea placeholder='포스트 요약을 입력하세요' {...field} />
                </FormControl>
                <FormMessage>{errors.excerpt?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Separator />

          {/* SEO Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>SEO 설정</h3>

            <FormField
              control={control}
              name='seo_title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO 제목</FormLabel>
                  <FormControl>
                    <Input placeholder='검색엔진용 제목' {...field} />
                  </FormControl>
                  <FormMessage>{errors.seo_title?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='meta_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메타 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='검색 결과에 표시될 설명'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.meta_description?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Image Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>이미지</h3>

            <FormField
              control={control}
              name='featured_image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>대표 이미지 URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='대표 이미지 URL을 입력하세요'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.featured_image?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='og_image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG 이미지 URL</FormLabel>
                  <FormControl>
                    <Input placeholder='공유시 표시될 이미지 URL' {...field} />
                  </FormControl>
                  <FormMessage>{errors.og_image?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Tags Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>태그</h3>
            <div className='space-y-2'>
              <Input
                placeholder='태그를 입력하고 Enter를 누르세요'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
              <div className='flex flex-wrap gap-2 mt-2'>
                {watch('tags')?.map((tag) => (
                  <Badge key={tag} variant='secondary'>
                    {tag}
                    <button
                      type='button'
                      onClick={() => handleRemoveTag(tag)}
                      className='ml-1 hover:text-destructive'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormMessage>{errors.tags?.message}</FormMessage>
            </div>
          </div>

          {/* Publish Switch */}
          <FormField
            control={control}
            name='is_published'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>즉시 발행</FormLabel>
              </FormItem>
            )}
          />

          {/* Form Actions */}
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
