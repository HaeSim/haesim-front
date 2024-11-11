// src/app/(routes)/blog/page.tsx
import prisma from '@/lib/prisma';
import { PostCard } from '@/components/blog/post-card';
import { Pagination } from '@/components/pagination';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = 10;
  const skip = (page - 1) * limit;

  const [posts, totalPosts] = await Promise.all([
    prisma.posts.findMany({
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
      take: limit,
      skip,
    }),
    prisma.posts.count({
      where: {
        is_published: true,
      },
    }),
  ]);

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>블로그</h1>
      <div className='grid gap-6'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        className='mt-8'
        page={page}
        totalPages={Math.ceil(totalPosts / limit)}
      />
    </main>
  );
}
