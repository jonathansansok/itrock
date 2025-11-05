"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "@/store/slices/feedSlice";
import type { Post } from "@/types";

export default function PostComposer() {
  const d = useDispatch();
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;

    const post: Post = {
      id: crypto.randomUUID(),
      userId: "u-local",
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    console.log("[PostComposer] addPost", post.id);
    d(addPost(post));
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="mb-4 rounded-2xl bg-white p-4 shadow">
      <textarea
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="¿Qué estás pensando?"
        className="w-full rounded-xl border px-3 py-2 text-sm min-h-20"
      />
      <div className="mt-2 flex justify-end">
        <button className="rounded-xl bg-black px-3 py-2 text-white">Publicar</button>
      </div>
    </form>
  );
}
