"use client";

import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";
import LogoutButton from "@/components/molecules/LogoutButton";

export default function AppHeader() {
  return (
    <header
      className={[
       "sticky top-0 z-40 backdrop-blur bg-black/80 supports-backdrop-filter:bg-black/50",
        "border-b border-neutral-900"
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto flex h-14 w-full max-w-[980px] items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <InstagramGlyph size={28} yOffset={-1} />
          <InstagramWordmark width={100} />
          <span className="hidden sm:inline text-xs text-neutral-500 mx-1">by</span>
          <InstaSansoWordmark width={96} fontSize={22} className="hidden sm:inline" />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-lg border border-neutral-800 bg-black/50 px-3 py-1.5">
            <input
              placeholder="Buscar"
              className="w-40 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
