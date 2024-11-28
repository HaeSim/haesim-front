import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Eye, Calendar, User } from 'lucide-react';
import MarkdownViewer from '@/components/posts/markdown/markdown-viewer';
import { generateBlogPostSchema } from '@/utils/schema';
import Script from 'next/script';

interface Props {
  params: Promise<{ slug: string }>;
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 포스트를 찾을 수 없습니다.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    title: post.seo_title || `${post.title} | 혜심 블로그`,
    description:
      post.meta_description ||
      post.excerpt ||
      `${post.title}에 대한 블로그 포스트입니다.`,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || '',
      url: `${baseUrl}/posts/${post.slug}`,
      siteName: '혜심 블로그',
      images: post.og_image
        ? [
            {
              url: post.og_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      locale: 'ko_KR',
      type: 'article',
      publishedTime: post.published_at?.toISOString(),
      modifiedTime: post.updated_at?.toISOString(),
      authors: [post.authors.name],
      tags: post.posts_tags.map(({ tags }) => tags.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || '',
      images: post.og_image ? [post.og_image] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/posts/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://haesim.me';

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

  // 조회수 증가
  await prisma.posts.update({
    where: { slug: decodedSlug },
    data: {
      view_count: {
        increment: 1,
      },
    },
  });

  const jsonLd = generateBlogPostSchema(post, baseUrl);

  return (
    <>
      <Script
        id='blog-post-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container max-w-4xl mx-auto px-4 py-8'>
        <article className='space-y-8'>
          {/* 카테고리 */}
          <Link href={`/category/${post.categories?.slug}`}>
            <Badge variant='secondary' className='mb-4'>
              {post.categories?.name}
            </Badge>
          </Link>

          {/* 제목 */}
          <h1 className='text-4xl font-bold'>{post.title}</h1>

          {/* 메타 정보 */}
          <div className='flex items-center gap-6 text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <User className='w-4 h-4' />
              <span>{post.authors?.name}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              <time dateTime={post.updated_at?.toISOString()}>
                {format(new Date(post.updated_at || ''), 'PPP', {
                  locale: ko,
                })}
              </time>
            </div>
            <div className='flex items-center gap-2'>
              <Eye className='w-4 h-4' />
              <span>{(post.view_count || 0).toString()} 조회</span>
            </div>
          </div>

          <Separator />

          {/* 본문 */}
          <div className='py-4'>
            <MarkdownViewer content={post.content} />
          </div>

          <Separator />

          {/* 태그 */}
          <div className='flex gap-2 flex-wrap'>
            {post.posts_tags.map(({ tags }) => (
              <Link key={tags.id} href={`/tag/${tags.slug}`}>
                <Badge variant='outline'>{tags.name}</Badge>
              </Link>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
