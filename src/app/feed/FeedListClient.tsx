"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import PostCard from "@/components/molecules/PostCard";
import type { Post } from "@/interfaces";

export default function FeedListClient({ initialPosts = [] }: { initialPosts?: Post[] }) {
  const posts = useSelector((s: RootState) => s.feed.posts);
  const list = posts?.length ? posts : initialPosts;

  if (!list?.length) {
    return (
      <div className="mt-6 rounded-2xl border border-neutral-800/80 bg-black/60 backdrop-blur-sm p-6 text-sm text-neutral-300">
        No hay publicaciones aún. <span className="text-neutral-100">¡Sé el primero en publicar!</span>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {list.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
