// src/utils/calculate-reading-time.ts

interface ReadingTimeOptions {
  wordsPerMinute?: number; // 일반 텍스트 분당 단어 수
  koreanCharPerMinute?: number; // 한글 분당 문자 수
  codeWordsPerMinute?: number; // 코드 분당 단어 수
}

export function calculateReadingTime(
  content: string,
  options: ReadingTimeOptions = {}
) {
  // 기본값 설정
  const {
    wordsPerMinute = 200, // 영어 기준 일반적인 읽기 속도
    koreanCharPerMinute = 600, // 한글 기준 일반적인 읽기 속도
    codeWordsPerMinute = 100, // 코드 읽기 속도
  } = options;

  // 마크다운에서 코드 블록 추출
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];

  // 코드 블록을 제외한 일반 텍스트
  let textContent = content;
  codeBlocks.forEach((block) => {
    textContent = textContent.replace(block, '');
  });

  // 한글과 영어/숫자 분리
  const korean = textContent.match(/[가-힣]/g) || [];
  const english = textContent.replace(/[가-힣]/g, '').match(/\b\w+\b/g) || [];

  // 코드 블록의 단어 수 계산
  const codeWords = codeBlocks.join(' ').match(/\b\w+\b/g)?.length || 0;

  // 각각의 읽기 시간 계산
  const koreanTime = korean.length / koreanCharPerMinute;
  const englishTime = english.length / wordsPerMinute;
  const codeTime = codeWords / codeWordsPerMinute;

  // 전체 읽기 시간 계산 (분 단위)
  const totalMinutes = koreanTime + englishTime + codeTime;

  // 올림하여 정수로 반환
  return Math.ceil(totalMinutes);
}
