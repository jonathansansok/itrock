"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";
import LogoutButton from "@/components/molecules/LogoutButton";
import Avatar from "@/components/atoms/Avatar";
import { Home } from "lucide-react"; // 👈 nuevo icono

export default function AppHeader() {
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);
  const user = useSelector((s: RootState) => s.auth.user);

  const isProfile = typeof window !== "undefined" && window.location.pathname.startsWith("/u/");

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
              {/* 👇 En mobile muestra la casita si está en perfil */}
              {isProfile ? (
                <Link
                  href="/feed"
                  aria-label="Volver al feed"
                  title="Feed"
                  className="sm:hidden inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 active:scale-95 transition p-1.5"
                >
                  <Home size={22} className="text-neutral-300" />
                </Link>
              ) : (
                <Link
                  href={`/u/${encodeURIComponent(user.id)}`}
                  aria-label="Ir a mi perfil"
                  title={user.name || user.email || "Mi perfil"}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 active:scale-95 transition p-0.5"
                >
                  <Avatar
                    name={user.name || user.email || "Yo"}
                    size={28}
                  />
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
