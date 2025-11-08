"use client";
import Image from "next/image";
import BookmarkButton from "@/components/atoms/BookmarkButton";

export default function PostMedia({
  imageUrl,
  alt,
  showBookmark,
  saved,
  toggleSaveAction,
}: {
  imageUrl: string;
  alt: string;
  showBookmark: boolean;
  saved: boolean;
  toggleSaveAction: () => void;
}) {
  return (
    <>
      <div className="mb-2">
        <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "1 / 1" }}>
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 800px"
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
      {showBookmark && (
        <div className="flex justify-end">
          <BookmarkButton saved={saved} toggleAction={toggleSaveAction} />
        </div>
      )}
    </>
  );
}
