import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton() {
  return (
    <article className='p-6 bg-card rounded-lg shadow-sm'>
      <div className='space-y-4'>
        {/* Title skeleton */}
        <Skeleton className='h-8 w-3/4' />

        {/* Excerpt skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>

        {/* Footer skeleton */}
        <footer className='flex items-center gap-4 pt-4'>
          {/* Author skeleton */}
          <div className='flex items-center gap-2'>
            <Skeleton className='w-6 h-6 rounded-full' />
            <Skeleton className='h-4 w-24' />
          </div>

          {/* Date skeleton */}
          <Skeleton className='h-4 w-20' />

          {/* Reading time skeleton */}
          <Skeleton className='h-4 w-16' />
        </footer>
      </div>
    </article>
  );
}
