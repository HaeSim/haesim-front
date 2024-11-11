import { ThemeToggle } from '@/app/_component/layout/Header/ThemeToggle';

export function Header() {
  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>기술 블로그</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
