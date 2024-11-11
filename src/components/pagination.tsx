// src/components/ui/pagination.tsx
import Link from 'next/link';

interface PaginationProps {
  className?: string;
  page: number;
  totalPages: number;
}

export function Pagination({
  className = '',
  page,
  totalPages,
}: PaginationProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {page > 1 && (
        <Link
          href={`?page=${page - 1}`}
          className='px-4 py-2 bg-secondary hover:bg-secondary/80 rounded'
        >
          이전
        </Link>
      )}
      <span className='px-4 py-2'>
        {page} / {totalPages}
      </span>
      {page < totalPages && (
        <Link
          href={`?page=${page + 1}`}
          className='px-4 py-2 bg-secondary hover:bg-secondary/80 rounded'
        >
          다음
        </Link>
      )}
    </div>
  );
}
