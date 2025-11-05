//social-basic\src\app\feed\FeedListClient.tsx
"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import PostCard from "@/components/molecules/PostCard";

export default function FeedListClient() {
  const posts = useSelector((s: RootState) => s.feed.posts);

  console.log("[FeedListClient] posts en Redux:", posts.length);

  if (!posts?.length) {
    return (
      <div className="mt-6 rounded-xl border bg-white p-6 text-sm text-gray-700">
        No hay publicaciones aún. ¡Sé el primero en publicar!
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
