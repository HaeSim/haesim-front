// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // BigInt를 문자열로 변환
    const serializedCategories = JSON.parse(
      JSON.stringify(categories, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    return NextResponse.json(serializedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
