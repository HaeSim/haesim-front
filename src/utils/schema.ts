import { DBPost } from '@/types/blog';

export function generateBlogPostSchema(post: DBPost, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt || '',
    image: post.og_image || undefined,
    datePublished: post.published_at?.toISOString(),
    dateModified: post.updated_at?.toISOString(),
    author: {
      '@type': 'Person',
      name: post.authors.name,
    },
    publisher: {
      '@type': 'Organization',
      name: '혜심 블로그',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/posts/${post.slug}`,
    },
    keywords: post.posts_tags.map(({ tags }) => tags.name).join(', '),
  };
}
