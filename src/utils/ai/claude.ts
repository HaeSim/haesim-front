// src/utils/ai/claude.ts
import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function generateExcerpt(content: string): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      max_tokens: 300,
      model: 'claude-3-haiku-20240307',
      messages: [
        {
          role: 'user',
          content: `아래 블로그 포스트 내용을 바탕으로 100자 이내의 간결한 요약문을 생성해주세요. 
          SEO를 고려하되, 자연스러운 한국어로 작성해주세요.
          마크다운 문법은 제외하고 순수 텍스트만 반환해주세요.

          블로그 내용:
          ${content}`,
        },
      ],
    });

    // content[0]이 TextBlock 타입인지 확인
    const firstContent = message.content[0];
    if ('type' in firstContent && firstContent.type === 'text') {
      return firstContent.text.trim();
    }

    // text 속성이 없는 경우 fallback
    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error('Error generating excerpt:', error);
    // fallback: 컨텐츠의 첫 200자를 반환
    return content.replace(/#+\s|[*_`]|\n/g, '').slice(0, 200);
  }
}

export async function generateMetaDescription(
  title: string,
  content: string
): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      max_tokens: 200,
      model: 'claude-3-haiku-20240307',
      messages: [
        {
          role: 'user',
          content: `다음 블로그 포스트의 제목과 내용을 바탕으로 검색엔진 최적화(SEO)를 위한 메타 설명을 생성해주세요.
          
          - 50자 이내로 작성해주세요
          - 핵심 키워드를 자연스럽게 포함해주세요
          - 사용자의 클릭을 유도하는 매력적인 설명을 작성해주세요
          - 문장은 완결되어야 합니다
          
          제목: ${title}
          
          내용:
          ${content.slice(0, 1000)}`, // 내용은 앞부분만 사용
        },
      ],
    });

    const firstContent = message.content[0];
    if ('type' in firstContent && firstContent.type === 'text') {
      // 160자로 제한하여 반환
      return firstContent.text.trim().slice(0, 160);
    }

    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error('Error generating meta description:', error);
    // fallback: 제목 + 내용 앞부분으로 생성
    const fallbackDesc = `${title} - ${content.replace(/#+\s|[*_`]|\n/g, '').slice(0, 120)}`;
    return fallbackDesc.slice(0, 160);
  }
}
