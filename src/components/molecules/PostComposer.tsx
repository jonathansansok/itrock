// social-basic/src/components/molecules/PostComposer.tsx
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
    if (!isAuth || !currentUser?.id) {
      console.log("[PostComposer] no authenticated user");
      return;
    }

    const post: Post = {
      id: crypto.randomUUID(),
      userId: currentUser.id, // ← acá
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
      className="mb-4 rounded-2xl bg-white p-3 sm:p-4 shadow space-y-3"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          isAuth ? "¿Qué estás pensando?" : "Iniciá sesión para publicar"
        }
        disabled={!isAuth}
        className="w-full rounded-xl border px-3 py-2 text-sm sm:text-base min-h-24 sm:min-h-28 disabled:opacity-60"
      />

      <ImagePicker onImageAction={setImageDataUrl} />

      <div className="flex justify-end relative z-10">
        <button
          disabled={!isAuth}
          className="w-full sm:w-auto rounded-xl bg-black px-4 py-2 text-white text-sm sm:text-base disabled:opacity-60"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
