// utils/generate-slug.ts
export function generateSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣\-]/g, '') // 특수문자 제거 (한글, 영문, 숫자, 하이픈만 허용)
    .replace(/-+/g, '-') // 중복된 하이픈 제거
    .replace(/^-|-$/g, ''); // 시작과 끝의 하이픈 제거
}

export async function createUniqueSlug(
  title: string,
  prisma: any
): Promise<string> {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 0;

  while (true) {
    const exists = await prisma.posts.findUnique({
      where: { slug },
    });

    if (!exists) {
      return slug;
    }
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}
