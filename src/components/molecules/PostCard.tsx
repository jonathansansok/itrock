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
    // Enter envía; Shift+Enter permitiría salto de línea si fuera textarea
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canComment = isAuth && !!currentUser?.id;

  return (
    <article className="rounded-2xl bg-white p-3 sm:p-4 shadow">
      {/* IMAGEN PRIMERO */}
      {post.imageUrl && (
        <div className="mb-2">
          <div
            className="relative w-full max-h-112 overflow-hidden"
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

      {/* CAPTION DEBAJO DE LA FOTO (o arriba si no hay foto) */}
      {post.content && (
        <p
          className={`${
            post.imageUrl ? "mt-2" : ""
          } whitespace-pre-wrap text-sm sm:text-base`}
        >
          {post.content}
        </p>
      )}

      <div className="mt-2 text-xs sm:text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      <div className="flex items-center gap-2">
        <HeartButton
          liked={!!post.likedByMe}
          count={post.likes}
          onToggle={() => d(toggleLike({ postId: post.id }))}
        />
      </div>

      <div className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              canComment
                ? "Escribe un comentario…"
                : "Iniciá sesión para comentar"
            }
            disabled={!canComment}
            className="w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!canComment || !text.trim()}
            className="w-full sm:w-auto rounded-xl bg-black px-4 py-2 text-white text-sm disabled:opacity-60"
          >
            Comentar
          </button>
        </form>
      </div>

      {/* Lista de comentarios */}
      <ul className="mt-3 space-y-1 text-sm">
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
                  className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs leading-none hover:bg-gray-50"
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
