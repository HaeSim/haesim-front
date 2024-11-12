import { Skeleton } from '@/components/ui/skeleton';

export default function WorksLoading() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>작업실</h1>
      <div className='grid gap-6'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='space-y-4'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </main>
  );
}
