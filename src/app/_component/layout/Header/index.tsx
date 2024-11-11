import { ThemeToggle } from '@/app/_component/layout/Header/ThemeToggle';
import { ProfileButton } from '@/app/_component/layout/Header/ProfileButton';
import { Separator } from '@/components/ui/separator';

export function Header() {
  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>혜심 블로그</h1>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Separator orientation='vertical' className='h-6' />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
