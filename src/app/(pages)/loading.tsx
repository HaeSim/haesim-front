import { PostCardSkeleton } from '../_component/PostCard/skeleton';

export default function Loading() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        <section className='flex-grow'>
          <h2 className='text-2xl font-semibold mb-4'>최근 포스트</h2>
          <div className='space-y-6'>
            {/* 3개의 스켈레톤 카드를 보여줍니다 */}
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
