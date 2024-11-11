import { ChangeEvent, useState } from 'react';
import MarkdownViewer from './markdown-viewer';

interface MarkdownEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export function MarkdownEditor({
  initialContent = '',
  onChange,
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialContent);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <div className='grid grid-cols-2 gap-4 h-full'>
      <div className='w-full'>
        <textarea
          className='w-full h-[600px] p-4 border rounded-lg resize-none bg-background'
          value={content}
          onChange={handleChange}
          placeholder='마크다운을 입력하세요...'
        />
      </div>
      <div className='w-full border rounded-lg p-4 overflow-auto h-[600px]'>
        <MarkdownViewer content={content} />
      </div>
    </div>
  );
}
