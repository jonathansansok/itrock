"use client";
import Image from "next/image";

type Props = {
  imageUrl: string;
  alt?: string;
  imageW?: number;
  imageH?: number;
  showBookmark?: boolean;
  saved?: boolean;
  toggleSaveAction?: () => void;
};

export default function PostMedia({
  imageUrl,
  alt = "",
  imageW,
  imageH,
  showBookmark,
  saved,
  toggleSaveAction,
}: Props) {
  const ratio = imageW && imageH ? `${imageW} / ${imageH}` : "1 / 1";

  return (
    <div className="mt-2">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-black"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 800px"
          className="object-cover"
          unoptimized
        />
      </div>

      {showBookmark && (
        <div className="mt-2 flex items-center justify-end px-1">
        <button
          type="button"
          aria-label={saved ? "Quitar de guardados" : "Guardar"}
          onClick={toggleSaveAction}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full
                     text-neutral-300 hover:text-neutral-100 transition"
        >
          {saved ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z" />
            </svg>
          )}
        </button>
      </div>
      
      )}
    </div>
  );
}
