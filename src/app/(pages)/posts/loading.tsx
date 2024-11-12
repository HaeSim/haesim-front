import { PostCardSkeleton } from '@/app/_component/PostCard/skeleton';

export default function BlogLoading() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>블로그</h1>
      <div className='grid gap-6'>
        {Array.from({ length: 10 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
