"use client";
import Image from "next/image";
import { Post } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  toggleLike,
  addComment,
  removeComment,
  toggleSave,
  registerShare,
} from "@/store/slices/feedSlice";
import BookmarkButton from "@/components/atoms/BookmarkButton";
import ShareButton from "@/components/atoms/ShareButton";
import { shareOrCopy } from "@/lib/share";
import { useState } from "react";
import HeartButton from "@/components/atoms/HeartButton";

export default function PostCard({ post }: { post: Post }) {
  const d = useDispatch();
  const [text, setText] = useState("");
  const currentUser = useSelector((s: RootState) => s.auth.user);
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);

  const author = post.authorName || "Desconocido";

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
  const saved = (post.savedBy ?? []).includes(currentUser?.id ?? "");

  const onToggleSave = () => {
    if (!isAuth || !currentUser?.id) return;
    d(toggleSave({ postId: post.id, userId: currentUser.id }));
  };

  const onShare = async () => {
    const url = `${window.location.origin}/post/${post.id}`;
    const ok = await shareOrCopy(
      url,
      "Publicación",
      post.content?.slice(0, 120)
    );
    if (ok) d(registerShare({ postId: post.id }));
  };
  return (
    <article
      id={`post-${post.id}`}
      className="rounded-2xl bg-black/50 backdrop-blur-sm p-3 sm:p-4 scroll-mt-20"
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-neutral-100">
            Public. by {author}
          </div>
        </div>
      </header>

      {post.imageUrl && (
        <div className="mb-3">
          <div
            className="relative w-full overflow-hidden rounded-xl bg-black"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src={post.imageUrl}
              alt="post"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 800px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}

      {post.content && (
        <p className="whitespace-pre-wrap text-[15px] leading-6 text-neutral-100">
          {post.content}
        </p>
      )}
      <div className="text-xs text-neutral-400">
        {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <HeartButton
          liked={!!post.likedByMe}
          count={post.likes}
          onToggle={() => d(toggleLike({ postId: post.id }))}
        />
        <ShareButton count={post.shareCount ?? 0} shareAction={onShare} />
        <BookmarkButton saved={saved} toggleAction={onToggleSave} />
      </div>

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
            className="w-full rounded-full bg-neutral-900/60 px-4 py-2 text-sm text-neutral-100 placeholder:text-neutral-500
                       disabled:opacity-60 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!canComment || !text.trim()}
            className="w-full sm:w-auto rounded-full bg-neutral-900 px-4 py-2 text-sm text-neutral-100
                       hover:bg-neutral-800 disabled:opacity-60 active:scale-95 transition"
          >
            Comentar
          </button>
        </form>
      </div>

      <ul className="mt-3 space-y-1.5 text-sm text-neutral-200">
        {post.comments.map((c) => {
          const canDelete = currentUser?.id === c.userId;
          return (
            <li key={c.id} className="flex items-start justify-between gap-2">
              <span className="wrap-break-words">
                <b className="text-neutral-100">{c.userId}</b>{" "}
                <span className="text-neutral-300">— {c.text}</span>
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
                  className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md
                             hover:bg-neutral-900 active:scale-95 transition"
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
