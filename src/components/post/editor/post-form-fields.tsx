import { PostFormData } from '@/schemas/forms/post.form.schema';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/models/category';
import { Button } from '@/components/ui/button';

interface PostFormFieldsProps {
  form: UseFormReturn<PostFormData>;
  categories: Category[];
  isSubmitting: boolean;
  onContentChange: (content: string) => void;
}

export function PostFormFields({
  form,
  categories,
  isSubmitting,
  onContentChange,
}: PostFormFieldsProps) {
  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormLabel>제목</FormLabel>
            <FormControl>
              <Input placeholder='포스트 제목을 입력하세요' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='content'
        render={({ field }) => (
          <FormItem>
            <FormLabel>내용</FormLabel>
            <FormControl>
              <Textarea
                placeholder='마크다운으로 작성해보세요...'
                className='min-h-[400px] font-mono'
                onChange={(e) => {
                  field.onChange(e);
                  onContentChange(e.target.value);
                }}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name='excerpt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>요약</FormLabel>
              <FormControl>
                <Textarea placeholder='포스트 요약을 작성하세요' {...field} />
              </FormControl>
              <FormDescription>
                검색 결과에 표시될 요약문입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='meta_description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>메타 설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='SEO를 위한 메타 설명을 작성하세요'
                  {...field}
                />
              </FormControl>
              <FormDescription>검색 엔진에 표시될 설명입니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
        <FormField
          control={form.control}
          name='category_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='카테고리 선택' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id.toString()}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='is_published'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='!mt-0'>공개 여부</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='flex justify-end gap-4 pt-4'>
        <Button variant='outline' type='button'>
          취소
        </Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  );
}
