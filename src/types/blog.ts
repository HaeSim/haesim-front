export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  published_at: Date;
  updated_at: Date;
  view_count: number;
  is_published: boolean;
  author: Author;
  category: Category;
  tags: Tag[];
}
