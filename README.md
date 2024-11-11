# 개인 블로그 프로젝트

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js (App Router)
- **Styling**:
  - Tailwind CSS
  - shadcn/ui (컴포넌트 라이브러리)
- **상태 관리**: React (v19 RC)

### Backend

- **Database**: Supabase
- **ORM**: Prisma
- **인증**: Supabase Auth (쿠키 기반)

### 개발 도구

- **언어**: TypeScript
- **패키지 매니저**: Yarn
- **코드 포맷팅**: Prettier

### 주요 라이브러리

- **마크다운 렌더링**: react-markdown
- **코드 하이라이팅**: react-syntax-highlighter
- **날짜 처리**: date-fns
- **폼 검증**: zod
- **UI 컴포넌트**:
  - @radix-ui (접근성 준수 컴포넌트)
  - lucide-react (아이콘)
  - next-themes (다크모드)

## ✨ 주요 기능

- 반응형 디자인
- 다크모드 지원
- 마크다운 기반 블로그 포스팅
- 코드 신택스 하이라이팅
- 사용자 인증

## 🚀 시작하기

1. 저장소 클론

```bash
git clone [저장소 URL]
```

2. 의존성 설치

```bash
yarn install
```

3. 환경 변수 설정
   `.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. 개발 서버 실행

```bash
yarn dev
```

## 📝 License

MIT License

---

Built with ❤️ using Next.js and Supabase
