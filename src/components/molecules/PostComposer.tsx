"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { addPost } from "@/store/slices/feedSlice";
import type { Post } from "@/interfaces";
import ImagePicker from "@/components/molecules/ImagePicker";

export default function PostComposer() {
  const d = useDispatch();
  const [text, setText] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const currentUser = useSelector((s: RootState) => s.auth.user);
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content && !imageDataUrl) return;
    if (!isAuth || !currentUser?.id) return;

    const post: Post = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      content,
      imageUrl: imageDataUrl || undefined,
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    d(addPost(post));
    setText("");
    setImageDataUrl(null);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 rounded-2xl border border-neutral-800 bg-black p-3 sm:p-4 space-y-3"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          isAuth ? "¿Qué estás pensando?" : "Iniciá sesión para publicar"
        }
        disabled={!isAuth}
        className="w-full rounded-2xl bg-black border border-neutral-800 px-4 py-3 text-sm sm:text-base text-white placeholder:text-neutral-400 min-h-24 sm:min-h-28 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700"
      />

      <ImagePicker value={imageDataUrl} onImageAction={setImageDataUrl} />

      <div className="relative z-10 flex justify-end">
        <button
          disabled={!isAuth}
          className="w-full sm:w-auto rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-2
             text-sm sm:text-base text-white hover:bg-neutral-800 disabled:opacity-60 active:scale-95 transition"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
