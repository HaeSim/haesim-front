import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

// utils.ts에 개선된 generateSlug 함수
export function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      // 한글을 로마자로 변환 (npm install romanize-korean)
      .split('')
      .map((char) => {
        if (/[가-힣]/.test(char)) {
          // 한글은 영문으로 변환하거나 다른 방식으로 처리
          return encodeURIComponent(char);
        }
        return char;
      })
      .join('')
      .replace(/[^a-z0-9\-]/g, '-') // 알파벳, 숫자, 하이픈만 허용
      .replace(/-+/g, '-') // 연속된 하이픈을 하나로
      .replace(/^-|-$/g, '')
  ); // 시작과 끝의 하이픈 제거
}
