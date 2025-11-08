"use client";
import { useState } from "react";
import type { Comment } from "@/interfaces";

export default function CommentList({
  comments,
  currentUserId,
  removeAction,
}: {
  comments: Comment[];
  currentUserId?: string;
  removeAction: (commentId: string, userId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const visible = open ? comments : comments.slice(0, 1);

  if (!comments.length) return null;

  return (
    <div className="mt-3">
      <ul className="space-y-1.5 text-sm text-neutral-200">
        {visible.map((c) => {
          const canDelete = currentUserId === c.userId;
          return (
            <li key={c.id} className="flex items-start justify-between gap-2">
              <span className="min-w-0 wrap-break-words">
                <b className="text-neutral-100">{c.userId}</b>{" "}
                <span className="text-neutral-300">— {c.text}</span>
              </span>
              {canDelete && (
                <button
                  aria-label="Eliminar comentario"
                  title="Eliminar comentario"
                  onClick={() => removeAction(c.id, c.userId)}
                  className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md
                             hover:bg-neutral-900 active:scale-95 transition
                             focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {comments.length > 1 && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs
                       bg-neutral-900/50 border border-neutral-800 text-neutral-300
                       hover:bg-neutral-800 active:scale-95 transition
                       focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
            aria-expanded={open}
          >
            {open ? "Ocultar" : `Ver más coment. (${comments.length - 1})`}
          </button>
        </div>
      )}
    </div>
  );
}
