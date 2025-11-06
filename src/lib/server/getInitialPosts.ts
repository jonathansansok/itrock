import type { Post } from "@/interfaces";
import { posts as mockPosts } from "@/lib/mockDb";

export async function getInitialPosts(): Promise<Post[]> {
  return mockPosts;
}