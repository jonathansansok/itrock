"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import Avatar from "@/components/atoms/Avatar";

export default function HeaderNav({
  isProfile,
  userId,
  userName,
}: {
  isProfile: boolean;
  userId: string;
  userName: string;
}) {
  const baseCls =
    "inline-flex items-center justify-center rounded-full transition active:scale-95 " +
    "bg-transparent hover:bg-transparent " +
    "md:bg-neutral-900/50 md:hover:bg-neutral-800 md:border md:border-neutral-800";

  return (
    <>
      {isProfile ? (
        <Link
          href="/feed"
          aria-label="Volver al feed"
          className={`${baseCls} w-8 h-8 p-0.5 md:w-auto md:h-auto md:px-2 md:py-1.5`}
        >
          <Home size={20    } className="text-neutral-300" />
          <span className="hidden md:inline ml-2 text-sm text-neutral-300">
            Home
          </span>
        </Link>
      ) : (
        <Link
          href={`/u/${encodeURIComponent(userId)}`}
          aria-label="Ir a mi perfil"
          className={`${baseCls} w-8 h-8 p-0.5 md:w-auto md:h-auto md:pl-0.5 md:pr-2 md:py-0.5`}
        >
          <Avatar name={userName} size={28} />
          <span className="hidden md:inline ml-2 text-sm text-neutral-300">
            Perfil
          </span>
        </Link>
      )}
    </>
  );
}
