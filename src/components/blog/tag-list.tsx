// src/components/blog/tag-list.tsx
import Link from 'next/link';

export function TagList({ tags }: { tags: any[] }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/tag/${tag.slug}`}
          className='px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80'
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}
