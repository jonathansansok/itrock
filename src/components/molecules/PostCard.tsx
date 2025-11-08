// social-basic/src/components/molecules/PostCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Post } from "@/interfaces";
import {
  toggleLike,
  addComment,
  removeComment,
  toggleSave,
} from "@/store/slices/feedSlice";
import BookmarkButton from "@/components/atoms/BookmarkButton";
import { useState } from "react";
import PostActions from "@/components/molecules/PostActions";

export default function PostCard({ post }: { post: Post }) {
  const d = useDispatch();
  const [text, setText] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);

  const currentUser = useSelector((s: RootState) => s.auth.user);
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);

  const author = post.authorName || "Desconocido";
  const canComment = isAuth && !!currentUser?.id;
  const saved = (post.savedBy ?? []).includes(currentUser?.id ?? "");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault?.();
    const comment = text.trim();
    if (!comment) return;
    if (!isAuth || !currentUser?.id) return;

    d(addComment({ postId: post.id, comment, userId: currentUser.id }));
    setText("");
    // Abrimos el bloque para que se vea inmediatamente el nuevo comentario
    setCommentsOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const onToggleSave = () => {
    if (!isAuth || !currentUser?.id) return;
    d(toggleSave({ postId: post.id, userId: currentUser.id }));
  };

  return (
    <article
      id={`post-${post.id}`}
      className="rounded-2xl bg-black/50 backdrop-blur-sm p-3 sm:p-4 scroll-mt-20"
    >

      <header className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-100">
          Public. by{" "}
          <Link href={`/u/${post.userId}`} className="hover:underline">
            {author}
          </Link>
        </div>
      </header>

      {post.imageUrl && (
        <>
          <div className="mb-2">
            <div
              className="relative w-full overflow-hidden rounded-xl bg-black"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                src={post.imageUrl}
                alt={post.content ? post.content.slice(0, 120) : ""}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 800px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="flex justify-end">
            <BookmarkButton saved={saved} toggleAction={onToggleSave} />
          </div>
        </>
      )}

    
      {post.content && (
        <p className="mt-2 whitespace-pre-wrap text-[15px] leading-6 text-neutral-100">
          {post.content}
        </p>
      )}


      <div className="mt-1 text-xs text-neutral-400">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      <PostActions
        liked={!!post.likedByMe}
        likesCount={post.likes}
        likeAction={() => d(toggleLike({ postId: post.id }))}
        shareCount={post.shareCount ?? 0}
        shareUrl={`${window.location.origin}/feed#post-${post.id}`}
        saved={saved}
        toggleSaveAction={onToggleSave}
        showBookmark={!post.imageUrl}
      />


      {post.comments.length > 0 && (
        <div className="mt-3">
          <ul className="space-y-1.5 text-sm text-neutral-200">
            {(commentsOpen ? post.comments : post.comments.slice(0, 1)).map(
              (c) => {
                const canDelete = currentUser?.id === c.userId;
                return (
                  <li
                    key={c.id}
                    className="flex items-start justify-between gap-2"
                  >
                    <span className="min-w-0 wrap-break-words">
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
                                   hover:bg-neutral-900 active:scale-95 transition
                                   focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
                      >
                        ×
                      </button>
                    )}
                  </li>
                );
              }
            )}
          </ul>

   
          {post.comments.length > 1 && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setCommentsOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs
                           bg-neutral-900/50 border border-neutral-800 text-neutral-300
                           hover:bg-neutral-800 active:scale-95 transition
                           focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
                aria-expanded={commentsOpen}
              >
                {commentsOpen ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="opacity-80"
                      aria-hidden
                    >
                      <path
                        d="M18 15l-6-6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    Ocultar
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="opacity-80"
                      aria-hidden
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    Ver más coment. ({post.comments.length - 1})
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}


      <div className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              canComment ? "Añade un comentario…" : "Iniciá sesión para comentar"
            }
            disabled={!canComment}
            className="flex-1 min-w-0 rounded-full bg-neutral-900/60 px-3 py-2 text-sm
                       text-neutral-100 placeholder:text-neutral-500
                       disabled:opacity-60 focus:outline-none
                       focus-visible:ring-1 focus-visible:ring-neutral-700"
          />

          <button
            type="submit"
            disabled={!canComment || !text.trim()}
            aria-label="Enviar comentario"
            className="shrink-0 inline-flex items-center justify-center
                       h-9 w-9 rounded-full border border-emerald-500 text-emerald-400
                       bg-emerald-500/15 hover:bg-emerald-500/25
                       disabled:opacity-60 active:scale-95 transition
                       focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            title="Comentar"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="fill-none">
              <path
                d="M20 7L10 17l-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </article>
  );
}
