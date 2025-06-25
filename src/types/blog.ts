export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'DevOps' | 'Cloud' | 'Software Development';
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  readTime: number;
}

export interface Author {
  name: string;
  avatar?: string;
  bio: string;
}