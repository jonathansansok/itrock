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

        {showBookmark && (
          <button
            type="button"
            aria-label={saved ? "Quitar de guardados" : "Guardar"}
            onClick={toggleSaveAction}
            className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 hover:bg-black/75"
          >
            {saved ? "★" : "☆"}
          </button>
        )}
      </div>
    </div>
  );
}
