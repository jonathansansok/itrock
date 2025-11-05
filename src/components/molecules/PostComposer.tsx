"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "@/store/slices/feedSlice";
import type { Post } from "@/interfaces";
import ImagePicker from "@/components/molecules/ImagePicker";

export default function PostComposer() {
  const d = useDispatch();
  const [text, setText] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content && !imageDataUrl) return;

    const post: Post = {
      id: crypto.randomUUID(),
      userId: "u-local",
      content,
      imageUrl: imageDataUrl || undefined,
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    console.log("[PostComposer] addPost", post.id);
    d(addPost(post));
    setText("");
    setImageDataUrl(null);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 rounded-2xl bg-white p-4 shadow space-y-3"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="¿Qué estás pensando?"
        className="w-full rounded-xl border px-3 py-2 text-sm min-h-20"
      />

      <ImagePicker onImageAction={setImageDataUrl} />

      <div className="flex justify-end relative z-10">
        <button className="rounded-xl bg-black px-3 py-2 text-white">
          Publicar
        </button>
      </div>
    </form>
  );
}
