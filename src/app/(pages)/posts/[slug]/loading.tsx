import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
  return (
    <main className='container max-w-4xl mx-auto px-4 py-8'>
      <article className='space-y-8'>
        {/* 카테고리 스켈레톤 */}
        <Skeleton className='h-6 w-20' />

        {/* 제목 스켈레톤 */}
        <Skeleton className='h-12 w-3/4' />

        {/* 메타 정보 스켈레톤 */}
        <div className='flex items-center gap-6 text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-4 h-4' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-4 h-4' />
            <Skeleton className='h-4 w-24' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-4 h-4' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>

        <Skeleton className='h-px w-full' />

        {/* 본문 스켈레톤 */}
        <div className='py-4 space-y-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className='h-4 w-full' />
          ))}
          <Skeleton className='h-4 w-2/3' />
        </div>

        <Skeleton className='h-px w-full' />

        {/* 태그 스켈레톤 */}
        <div className='flex gap-2 flex-wrap'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-6 w-16 rounded-full' />
          ))}
        </div>
      </article>
    </main>
  );
}
