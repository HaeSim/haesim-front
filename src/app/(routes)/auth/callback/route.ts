// src/app/(routes)/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const origin = requestUrl.origin;
    const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();

    // 에러 파라미터 확인
    const error = requestUrl.searchParams.get('error');
    const errorDescription = requestUrl.searchParams.get('error_description');

    if (error) {
      console.error('Auth error:', error, errorDescription);
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(errorDescription || 'Unknown error')}`
      );
    }

    if (code) {
      const supabase = await createClient();
      const { error: sessionError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        console.error('Session error:', sessionError);
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent(sessionError.message)}`
        );
      }
    }

    if (redirectTo) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }

    return NextResponse.redirect(`${origin}/`);
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(
      `${origin}/login?error=Unexpected error occurred`
    );
  }
}
