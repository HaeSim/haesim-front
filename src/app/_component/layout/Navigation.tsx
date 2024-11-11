import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NAV_ITEMS = [
  { name: '홈', path: '/' },
  { name: '포스트', path: '/blog' },
  { name: '작업실', path: '/works' },
];

export function Navigation() {
  return (
    <nav className='border-b'>
      <div className='container mx-auto px-4 py-2'>
        <ul className='flex space-x-4'>
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <Button variant='link' asChild>
                <Link href={item.path}>{item.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
