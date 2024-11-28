import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { PostCreateRequestSchema } from '@/schemas/forms/post.form.schema';
import { calculateReadingTime } from '@/utils/calculate-reading-time';
import { generateExcerpt, generateMetaDescription } from '@/utils/ai/claude';
import { createUniqueSlug } from '@/utils/generate-slug';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.email) {
      return NextResponse.json(
        { message: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    const author = await prisma.authors.findUnique({
      where: { email: user.email },
    });

    if (!author) {
      return NextResponse.json(
        { message: '등록된 작성자가 아닙니다.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = PostCreateRequestSchema.parse(body);

    const slug = await createUniqueSlug(validatedData.title, prisma);
    const readingTime = calculateReadingTime(validatedData.content);

    const [excerpt, metaDescription] = await Promise.all([
      generateExcerpt(validatedData.content),
      generateMetaDescription(validatedData.title, validatedData.content),
    ]);

    const post = await prisma.posts.create({
      data: {
        title: validatedData.title,
        slug,
        content: validatedData.content,
        authors: { connect: { id: author.id } },
        categories: { connect: { id: validatedData.category_id } },
        is_published: true,
        published_at: new Date(),
        og_image: validatedData.og_image,
        reading_time_minutes: readingTime,
        excerpt,
        meta_description: metaDescription,
      },
    });

    const serializedPost = JSON.parse(
      JSON.stringify(post, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    return NextResponse.json(serializedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
