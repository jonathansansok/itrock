"use client";
import Link from "next/link";

export default function PostHeader({
  authorLabel,
  userId,
}: { authorLabel: string; userId: string }) {
  return (
    <header className="mb-3 flex items-center justify-between">
      <div className="text-sm font-semibold text-neutral-100">
        Public. by{" "}
        <Link href={`/u/${userId}`} className="hover:underline">
          {authorLabel}
        </Link>
      </div>
    </header>
  );
}
