export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export type User = SessionUser;

export interface LocalUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  likes: number;
  likedByMe?: boolean;
  createdAt: string;
  comments: Comment[];
  authorName?: string;
  savedBy?: string[];     
  shareCount?: number;   

}
