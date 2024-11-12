// @ts-nocheck @ts-ignore
// react-dom 19 버전 차이로 인한 오류 무시
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <ReactMarkdown
      className='prose prose-slate dark:prose-invert max-w-none'
      components={{
        // 코드 블록 커스터마이징
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag='div'
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        // 이미지 커스터마이징
        img: (props) => (
          <img
            {...props}
            className='rounded-lg max-h-[500px] w-auto mx-auto'
            alt={props.alt || ''}
          />
        ),
        // 링크 커스터마이징
        a: (props) => (
          <a
            {...props}
            className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            target='_blank'
            rel='noopener noreferrer'
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
