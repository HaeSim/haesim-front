'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';


export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Moon className='h-[1.2rem] w-[1.2rem]' />
      )}
      <span className='sr-only'>테마 변경</span>
    </Button>
  );
}
