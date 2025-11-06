"use client";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { addPost } from "@/store/slices/feedSlice";
import type { Post } from "@/interfaces";
import Image from "next/image";
import { readFileAsDataURL, resizeDataUrl } from "@/lib/image";

export default function PostComposer() {
  const d = useDispatch();
  const [text, setText] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const currentUser = useSelector((s: RootState) => s.auth.user);
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);

  const onPickFile = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataUrl = await readFileAsDataURL(f);
    const resized = await resizeDataUrl(dataUrl, 1600, 1600, "image/jpeg", 0.85);
    setImageDataUrl(resized);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content && !imageDataUrl) return;
    if (!isAuth || !currentUser?.id) return;
  
    const authorName = currentUser?.name || currentUser?.email || "Desconocido";
  
    const post: Post = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      content,
      imageUrl: imageDataUrl || undefined,
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
      authorName,
    };
  
    d(addPost(post));
    setText("");
    setImageDataUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };
  

  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 rounded-2xl bg-black/40 backdrop-blur-sm p-3 sm:p-4 space-y-3"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isAuth ? "¿Qué estás pensando?" : "Iniciá sesión para publicar"}
        disabled={!isAuth}
        className="w-full rounded-2xl bg-neutral-900/40 px-4 py-3 text-sm sm:text-base text-white placeholder:text-neutral-400 min-h-24 sm:min-h-28 disabled:opacity-60 focus:outline-none focus:ring-0"
      />

      {/* barra de acciones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPickFile}
            disabled={!isAuth}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900/50 px-3 py-2 hover:bg-neutral-800 active:scale-95 disabled:opacity-60"
            aria-label="Adjuntar imagen"
          >
            {/* ícono imagen multicolor (inline, sin deps) */}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="ig-mc" x1="0" x2="1" y1="1" y2="0">
                  <stop offset="0" stopColor="#FDD074" />
                  <stop offset="0.25" stopColor="#F77F34" />
                  <stop offset="0.5" stopColor="#DD326E" />
                  <stop offset="0.75" stopColor="#D82B7E" />
                  <stop offset="1" stopColor="#A432B1" />
                </linearGradient>
              </defs>
              <path
                fill="url(#ig-mc)"
                d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 12H5v-2.586l3.293-3.293a1 1 0 0 1 1.414 0L12 14l3.293-3.293a1 1 0 0 1 1.414 0L19 12.999V17Zm-9-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
              />
            </svg>
            <span className="hidden sm:inline text-sm text-neutral-200">Foto</span>
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        <button
          disabled={!isAuth}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm sm:text-base text-white hover:bg-neutral-800 disabled:opacity-60 active:scale-95 transition"
        >
          Publicar
        </button>
      </div>

      {/* preview minimal */}
      {imageDataUrl && (
        <div className="relative mt-2">
          <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "1 / 1" }}>
            <Image
              src={imageDataUrl}
              alt="preview"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 800px"
              className="object-contain"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={() => { setImageDataUrl(null); if (fileRef.current) fileRef.current.value = ""; }}
            aria-label="Quitar imagen"
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 hover:bg-black/80"
          >
            ×
          </button>
        </div>
      )}
    </form>
  );
}
