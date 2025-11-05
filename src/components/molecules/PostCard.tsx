// social-basic/src/components/molecules/PostCard.tsx
"use client";
import Image from "next/image";
import { Post } from "@/interfaces";
import { useDispatch } from "react-redux";
import { toggleLike, addComment } from "@/store/slices/feedSlice";
import { useState } from "react";

export default function PostCard({ post }: { post: Post }) {
  const d = useDispatch();
  const [text, setText] = useState("");

  return (
    <article className="rounded-2xl bg-white p-4 shadow">
      <p className="mb-2 whitespace-pre-wrap">{post.content}</p>

      {post.imageUrl && (
        <div className="mb-2">
          {/* Wrapper con relación de aspecto + límite de altura */}
          <div className="relative w-full max-h-112 overflow-hidden rounded-xl border bg-gray-50" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={post.imageUrl}
              alt="post"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-contain"
              unoptimized
              priority={false}
            />
          </div>
        </div>
      )}

      <div className="mb-2 text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => d(toggleLike({ postId: post.id }))}
          className="rounded-lg border px-2 py-1"
        >
          ❤️ {post.likes}
        </button>
      </div>

      <div className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text) return;
            d(addComment({ postId: post.id, comment: text, userId: "u2" }));
            setText("");
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe un comentario…"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </form>
      </div>

      <ul className="mt-3 space-y-1 text-sm">
        {post.comments.map((c) => (
          <li key={c.id}>
            <b>{c.userId}</b>: {c.text}
          </li>
        ))}
      </ul>
    </article>
  );
}
