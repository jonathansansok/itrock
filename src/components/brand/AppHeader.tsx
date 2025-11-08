"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";
import LogoutButton from "@/components/molecules/LogoutButton";
import Avatar from "@/components/atoms/Avatar";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);
  const user = useSelector((s: RootState) => s.auth.user);
  const pathname = usePathname();

  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    const next = pathname?.startsWith("/u/") ?? false;
    if (next !== isProfile) setIsProfile(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header
      className={[
        "sticky top-0 z-40 backdrop-blur bg-black/80 supports-backdrop-filter:bg-black/50",
        "border-b border-neutral-900",
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto flex h-14 w-full max-w-[980px] items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <InstagramGlyph size={28} yOffset={-1} />
          <InstagramWordmark width={100} />
          <span
            className="mx-1 text-xs text-neutral-500 align-middle hidden md:inline-block"
            style={{ transform: "translateY(2px)" }}
          >
            by
          </span>
          <InstaSansoWordmark
            width={96}
            fontSize={22}
            className="hidden md:inline-block align-middle"
          />
        </div>

        <div className="flex items-center gap-3">
          {isAuth && user?.id && (
            <>
              {isProfile ? (
               
                <Link
                  href="/feed"
                  aria-label="Volver al feed"
                  className="
      inline-flex items-center justify-center rounded-full
      border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800
      active:scale-95 transition
      w-8 h-8 p-0.5               
      md:w-auto md:h-auto        
      md:px-2 md:py-1.5        
    "
                >
                  <Home size={20} className="text-neutral-300" />
                  <span className="hidden md:inline ml-2 text-sm text-neutral-300">
                    Home
                  </span>
                </Link>
              ) : (
               
                <Link
                  href={`/u/${encodeURIComponent(user.id)}`}
                  aria-label="Ir a mi perfil"
                  className="
      inline-flex items-center justify-center rounded-full
      border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800
      active:scale-95 transition
      w-8 h-8 p-0.5              
      md:w-auto md:h-auto         
      md:pl-0.5 md:pr-2 md:py-0.5 
    "
                >
                  <Avatar name={user.name || user.email || "Yo"} size={28} />
                  <span className="hidden md:inline ml-2 text-sm text-neutral-300">
                    Perfil
                  </span>
                </Link>
              )}
            </>
          )}

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

