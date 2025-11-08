"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import HeaderBrand from "@/components/molecules/header/HeaderBrand";
import HeaderNav from "@/components/molecules/header/HeaderNav";
import LogoutButton from "@/components/molecules/LogoutButton";

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
      className="sticky top-0 z-40 backdrop-blur bg-black/80 supports-backdrop-filter:bg-black/50 border-b border-neutral-900"
      role="banner"
    >
      <div className="mx-auto flex h-14 w-full max-w-[980px] items-center justify-between px-3 sm:px-4">
        <HeaderBrand />

        <div className="flex items-center gap-3">
          {isAuth && user?.id && (
            <HeaderNav
              isProfile={isProfile}
              userId={user.id}
              userName={user.name || user.email || "Yo"}
            />
          )}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
