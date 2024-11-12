import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { PostCreateRequestSchema } from '@/schemas/forms/post.form.schema';

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

    const post = await prisma.posts.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        authors: { connect: { id: author.id } },
        is_published: validatedData.is_published,
        published_at: validatedData.is_published ? new Date() : null,
        og_image: validatedData.og_image,
      },
    });

    // BigInt를 문자열로 변환
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
