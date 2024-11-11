// src/components/blog/post-card.tsx
import Link from 'next/link';

export function PostCard({ post }: { post: any }) {
  return (
    <article className='p-6 bg-card rounded-lg shadow-sm'>
      <Link href={`/blog/${post.slug}`}>
        <h2 className='text-2xl font-semibold mb-2 hover:text-primary'>
          {post.title}
        </h2>
      </Link>
      <p className='text-muted-foreground mb-4'>{post.excerpt}</p>
      <footer className='flex items-center gap-4 text-sm text-muted-foreground'>
        {post.author && (
          <div className='flex items-center gap-2'>
            {post.author.avatar_url && (
              <img
                src={post.author.avatar_url}
                alt={post.author.name}
                className='w-6 h-6 rounded-full'
              />
            )}
            <span>{post.author.name}</span>
          </div>
        )}
        <time dateTime={post.published_at?.toISOString()}>
          {new Date(post.published_at).toLocaleDateString('ko-KR')}
        </time>
        <span>{post.reading_time_minutes}분 읽기</span>
      </footer>
    </article>
  );
}
