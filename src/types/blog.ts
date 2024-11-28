export interface Tag {
  id: bigint;
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  avatar_url: string | null;
}

export interface Category {
  id: bigint;
  name: string;
  slug: string;
  description: string | null;
}

export interface PostTag {
  tags: Tag;
}

export interface DBPost {
  id: bigint;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  featured_image: string | null;
  published_at: Date | null;
  updated_at: Date | null;
  is_published: boolean | null;
  view_count: bigint | null;
  reading_time_minutes: number | null;
  seo_title: string | null;
  og_image: string | null;
  authors: Author;
  categories: Category | null;
  posts_tags: PostTag[];
}

export interface PostMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale: string;
    type: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors: string[];
    tags: string[];
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    images?: string[];
    creator?: string;
  };
  alternates: {
    canonical?: string;
  };
}
