// src/app/page.tsx
import prisma from '@/lib/prisma';
import { PostCard } from '@/app/_component/PostCard';

export default async function Home() {
  const posts = await prisma.posts.findMany({
    where: {
      is_published: true,
    },
    include: {
      authors: {
        select: {
          name: true,
          avatar_url: true,
        },
      },
    },
    orderBy: {
      published_at: 'desc',
    },
    take: 3,
  });

  const postsWithAuthor = posts.map((post) => ({
    ...post,
    author: post.authors,
  }));

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        <section className='flex-grow'>
          <h2 className='text-2xl font-semibold mb-4'>최근 포스트</h2>
          {postsWithAuthor?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
        {/* <Sidebar /> */}
      </div>
    </main>
  );
}
