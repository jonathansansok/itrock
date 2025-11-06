import type { SessionUser, Post } from "./domain";

export interface AuthState {
  isAuthenticated: boolean;
  user?: SessionUser | null;
}

export interface FeedState {
  posts: Post[];
  loading: boolean;
  error?: string | null;
}

export interface LocalUser {
  id: string;
  name: string;
  email: string;
}
