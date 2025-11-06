
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setSession } from "@/store/slices/authSlice";
import type { SessionUser } from "@/types";

export default function AuthHydrator() {
  const { data: session, status } = useSession();
  const d = useDispatch();

  useEffect(() => {
    console.log("[AuthHydrator] status:", status, "session.user:", session?.user);
    if (status === "authenticated" && session?.user?.email) {
      const u: SessionUser = {
        id: session.user.email, 
        name: session.user.name || "",
        email: session.user.email,
        image: session.user.image ?? null,
      };
      d(setSession(u));
    }
    if (status === "unauthenticated") d(setSession(null));
  }, [status, session, d]);

  return null;
}
