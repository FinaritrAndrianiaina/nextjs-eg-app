export interface Author {
  name: string;
  profilePictureUrl: string;
  bio: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: Partial<Author>;
  publishedDate: string;
  imageUrl: string;
  tags: string[];
  excerpt: string;
  readTime?: string;
  likes?: number;
  commentsCount: number;
  isFeatured: boolean;
  url: string;
}
