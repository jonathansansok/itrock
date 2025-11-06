import type { Post } from "@/interfaces";
import { posts as mockPosts, users } from "@/lib/mockDb";

export async function getInitialPosts(): Promise<Post[]> {
  return mockPosts.map((p) => {
    const u = users.find((x) => x.id === p.userId);
    return { ...p, authorName: u?.name || "Desconocido" };
  });
}