import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Eye, User } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import MarkdownViewer from '@/components/posts/markdown/markdown-viewer';

interface PostPreviewProps {
  title: string;
  content: string;
  category?: string;
  author?: string;
}

export function PostPreview({
  title,
  content,
  category = '미지정',
  author = '작성자',
}: PostPreviewProps) {
  return (
    <article className='space-y-8'>
      <Badge variant='secondary' className='mb-4'>
        {category}
      </Badge>

      <h1 className='text-4xl font-bold'>{title}</h1>

      <div className='flex items-center gap-6 text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <User className='w-4 h-4' />
          <span>{author}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4' />
          <time>{format(new Date(), 'PPP', { locale: ko })}</time>
        </div>
      </div>

      <Separator />

      <div className='py-4'>
        <MarkdownViewer content={content} />
      </div>
    </article>
  );
}
