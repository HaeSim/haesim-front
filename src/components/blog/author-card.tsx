// src/components/blog/author-card.tsx
export function AuthorCard({
  author,
  className = '',
}: {
  author: any;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img
        src={author.avatar_url}
        alt={author.name}
        className='w-12 h-12 rounded-full'
      />
      <div>
        <h3 className='font-semibold'>{author.name}</h3>
        <p className='text-sm text-muted-foreground'>{author.bio}</p>
      </div>
    </div>
  );
}
