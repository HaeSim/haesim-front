import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const TAGS = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'];

export function Sidebar() {
  return (
    <aside className='w-full md:w-64'>
      <Card>
        <CardHeader>
          <CardTitle>검색</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder='검색어를 입력하세요' />
        </CardContent>
      </Card>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>최근 포스트</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[200px]'>
            <ul className='space-y-2'>
              {[1, 2, 3, 4, 5].map((post) => (
                <li key={post}>
                  <Button variant='link' className='p-0 h-auto'>
                    최근 포스트 {post}
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>태그</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {TAGS.map((tag) => (
              <Button key={tag} variant='secondary' size='sm'>
                {tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
