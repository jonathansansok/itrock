"use client";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/interfaces";

export default function PostMini({ post }: { post: Post }) {
  const snippet = (post.content || "").trim().slice(0, 80) || "Sin texto";
  const href = `/feed#post-${post.id}`;
  return (
    <Link href={href} className="flex items-center gap-3 group">
      <div className="h-12 w-12 overflow-hidden rounded-lg bg-neutral-900 shrink-0">
        {post.imageUrl ? (
          <Image src={post.imageUrl} alt="" width={48} height={48} className="h-12 w-12 object-cover" unoptimized />
        ) : (
          <div className="h-12 w-12 grid place-items-center text-xs text-neutral-400">POST</div>
        )}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-neutral-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="truncate text-sm text-neutral-200 group-hover:underline">
          {snippet}{post.content && post.content.length > 80 ? "…" : ""}
        </div>
      </div>
    </Link>
  );
}
