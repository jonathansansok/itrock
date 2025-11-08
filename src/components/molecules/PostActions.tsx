"use client";

import HeartButton from "@/components/atoms/HeartButton";
import ShareButton from "@/components/atoms/ShareButton";
import BookmarkButton from "@/components/atoms/BookmarkButton";

type Props = {
  liked: boolean;
  likesCount: number;
  likeAction: () => void;

  shareCount?: number;
  shareUrl: string;
  saved: boolean;
  toggleSaveAction: () => void;

  showBookmark?: boolean;
};

export default function PostActions({
  liked,
  likesCount,
  likeAction,
  shareCount = 0,
  shareUrl,
  saved,
  toggleSaveAction,
  showBookmark = true,
}: Props) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <HeartButton liked={liked} count={likesCount} toggleAction={likeAction} />
      <ShareButton count={shareCount} url={shareUrl} />
      {showBookmark && (
        <BookmarkButton saved={saved} toggleAction={toggleSaveAction} />
      )}
    </div>
  );
}
