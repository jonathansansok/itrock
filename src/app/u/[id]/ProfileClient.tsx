"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Post } from "@/interfaces";
import PostCard from "@/components/molecules/PostCard";
import PostMini from "@/components/molecules/PostMini";

export default function ProfileClient({
  userId,
  initialPosts,
}: {
  userId: string;
  initialPosts: Post[];
}) {
  const posts = useSelector((s: RootState) => s.feed.posts);
  const list = posts?.length ? posts : initialPosts;

  const [tab, setTab] = useState<"pubs" | "coms" | "saved">("pubs");

  const publications = useMemo(
    () => list.filter((p) => p.userId === userId),
    [list, userId]
  );
  const saved = useMemo(
    () => list.filter((p) => (p.savedBy ?? []).includes(userId)),
    [list, userId]
  );
  const comments = useMemo(
    () =>
      list.flatMap((p) =>
        p.comments
          .filter((c) => c.userId === userId)
          .map((c) => ({ post: p, comment: c }))
      ),
    [list, userId]
  );

  return (
    <div className="mx-auto w-full max-w-[680px] px-3 sm:px-4 py-4">
      <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setTab("pubs")}
          className={`flex-1 min-w-[100px] rounded-full px-4 py-2 text-sm sm:flex-none ${
            tab === "pubs"
              ? "bg-neutral-800 text-white"
              : "bg-neutral-900/50 text-neutral-300"
          }`}
        >
          Publicaciones
        </button>

        <button
          onClick={() => setTab("coms")}
          className={`flex-1 min-w-[100px] rounded-full px-4 py-2 text-sm sm:flex-none ${
            tab === "coms"
              ? "bg-neutral-800 text-white"
              : "bg-neutral-900/50 text-neutral-300"
          }`}
        >
          Comentarios
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`flex-1 min-w-[100px] rounded-full px-4 py-2 text-sm sm:flex-none ${
            tab === "saved"
              ? "bg-neutral-800 text-white"
              : "bg-neutral-900/50 text-neutral-300"
          }`}
        >
          Guardados
        </button>
      </div>

      {tab === "pubs" &&
        (publications.length ? (
          <div className="space-y-6">
            {publications.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">Sin publicaciones.</p>
        ))}
      {tab === "saved" &&
        (saved.length ? (
          <div className="space-y-6">
            {saved.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">Sin guardados.</p>
        ))}
      {tab === "coms" &&
        (comments.length ? (
          <ul className="space-y-3">
            {comments.map(({ post, comment }) => (
              <li
                key={comment.id}
                className="rounded-2xl bg-black/50 p-3 sm:p-4"
              >
                <div className="mb-2">
                  <PostMini post={post} />
                </div>
                <div className="text-sm text-neutral-100">“{comment.text}”</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-400">Sin comentarios.</p>
        ))}
    </div>
  );
}
