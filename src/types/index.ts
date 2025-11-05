// src/types/index.ts
export interface SessionUser { id: string; name: string; email: string; image?: string }
export type User = SessionUser; // ✅ sin quejarse

export interface Comment { id: string; postId: string; userId: string; text: string; createdAt: string }
export interface Post {
  id: string; userId: string; content: string; imageUrl?: string;
  likes: number; likedByMe?: boolean; createdAt: string; comments: Comment[];
}
export interface AuthState { isAuthenticated: boolean; user?: SessionUser | null }
export interface FeedState { posts: Post[]; loading: boolean; error?: string | null }
