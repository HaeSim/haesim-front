'use client';

import { PostFormProvider } from './_components/PostFormProvider';
import { BlogWriteContainer } from './_components/BlogWriteContainer';

export default function WritePage() {
  return (
    <PostFormProvider>
      <BlogWriteContainer />
    </PostFormProvider>
  );
}
