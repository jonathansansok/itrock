//social-basic\src\components\molecules\PostCard.tsx
"use client";
import Image from "next/image";
import { Post } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  toggleLike,
  addComment,
  removeComment,
} from "@/store/slices/feedSlice";
import { useState } from "react";
import HeartButton from "@/components/atoms/HeartButton";

export default function PostCard({ post }: { post: Post }) {
  const d = useDispatch();
  const [text, setText] = useState("");

  const currentUser = useSelector((s: RootState) => s.auth.user);
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const comment = text.trim();
    if (!comment) return;
    if (!isAuth || !currentUser?.id) return;
    d(addComment({ postId: post.id, comment, userId: currentUser.id }));
    setText("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canComment = isAuth && !!currentUser?.id;

  return (
    <article className="rounded-2xl border border-neutral-800 bg-black p-3 sm:p-4">
      {/* Imagen primero */}
      {post.imageUrl && (
        <div className="mb-2">
          <div
            className="relative w-full max-h-112 overflow-hidden bg-black"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src={post.imageUrl}
              alt="post"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 800px"
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {post.content && (
        <p
          className={`${
            post.imageUrl ? "mt-2" : ""
          } whitespace-pre-wrap text-sm sm:text-base text-neutral-200`}
        >
          {post.content}
        </p>
      )}

      <div className="mt-2 text-xs sm:text-sm text-neutral-400">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <HeartButton
          liked={!!post.likedByMe}
          count={post.likes}
          onToggle={() => d(toggleLike({ postId: post.id }))}
        />
      </div>

      {/* Input de comentario + botón */}
      <div className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              canComment
                ? "Añade un comentario…"
                : "Iniciá sesión para comentar"
            }
            disabled={!canComment}
            className="w-full rounded-full bg-black border border-neutral-800 px-4 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-600"
          />
          <button
            type="submit"
            disabled={!canComment || !text.trim()}
            className="w-full rounded-full bg-black px-4 py-2 text-sm text-neutral-100 hover:bg-neutral-800 disabled:opacity-60 sm:w-auto"
          >
            Comentar
          </button>
        </form>
      </div>

      <ul className="mt-3 space-y-1 text-sm text-neutral-200">
        {post.comments.map((c) => {
          const canDelete = currentUser?.id === c.userId;
          return (
            <li key={c.id} className="flex items-start justify-between gap-2">
              <span className="wrap-break-word break-all">
                <b>{c.userId}</b>: {c.text}
              </span>
              {canDelete && (
                <button
                  aria-label="Eliminar comentario"
                  title="Eliminar comentario"
                  onClick={() =>
                    d(
                      removeComment({
                        postId: post.id,
                        commentId: c.id,
                        userId: c.userId,
                      })
                    )
                  }
                  className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md border border-neutral-700 text-xs leading-none hover:bg-neutral-800"
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
