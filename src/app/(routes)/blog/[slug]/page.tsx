// src/app/(routes)/blog/[slug]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Eye, Calendar, User } from 'lucide-react';
import MarkdownViewer from '@/components/blog/markdown/markdown-viewer';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const post = await prisma.posts.findUnique({
    where: {
      slug: decodedSlug,
      is_published: true,
    },
    include: {
      authors: {
        select: {
          name: true,
          avatar_url: true,
        },
      },
      categories: true,
      posts_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const typedPost = post;

  await prisma.posts.update({
    where: { slug: decodedSlug },
    data: {
      view_count: {
        increment: 1,
      },
    },
  });

  return (
    <main className='container max-w-4xl mx-auto px-4 py-8'>
      <article className='space-y-8'>
        {/* 카테고리 */}
        <Link href={`/category/${typedPost.categories?.slug}`}>
          <Badge variant='secondary' className='mb-4'>
            {typedPost.categories?.name}
          </Badge>
        </Link>

        {/* 제목 */}
        <h1 className='text-4xl font-bold'>{typedPost.title}</h1>

        {/* 메타 정보 */}
        <div className='flex items-center gap-6 text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <User className='w-4 h-4' />
            <span>{typedPost.authors?.name}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4' />
            <time>
              {format(new Date(typedPost.updated_at || ''), 'PPP', {
                locale: ko,
              })}
            </time>
          </div>
          <div className='flex items-center gap-2'>
            <Eye className='w-4 h-4' />
            <span>{typedPost.view_count} 조회</span>
          </div>
        </div>

        <Separator />

        {/* 본문 */}
        <div className='py-4'>
          <MarkdownViewer content={typedPost.content} />
        </div>

        <Separator />

        {/* 태그 */}
        <div className='flex gap-2 flex-wrap'>
          {typedPost.posts_tags.map(({ tags }) => (
            <Link key={tags.id} href={`/tag/${tags.slug}`}>
              <Badge variant='outline'>{tags.name}</Badge>
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
