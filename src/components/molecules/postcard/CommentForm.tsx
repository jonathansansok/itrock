"use client";
import { useState } from "react";

export default function CommentForm({
  canComment,
  submitAction,
}: {
  canComment: boolean;
  submitAction: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault?.();
    const value = text.trim();
    if (!value || !canComment) return;
    submitAction(value);
    setText("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      className="mt-3 flex items-center gap-2"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={canComment ? "Añade un comentario…" : "Iniciá sesión para comentar"}
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
          <path d="M20 7L10 17l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}
