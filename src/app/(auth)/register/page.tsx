"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import RegisterForm from "@/components/molecules/RegisterForm";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";
import LoggedInBanner from "@/components/molecules/LoggedInBanner";

export default function Page() {
  const { data: session } = useSession();
  if (session) return <LoggedInBanner dest="/feed" />;

  return (
    <main className="relative min-h-dvh bg-black text-neutral-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(236,72,153,0.20),transparent_60%),radial-gradient(500px_250px_at_80%_0%,rgba(139,92,246,0.18),transparent_60%)]"
      />

      <header className="mx-auto hidden w-full max-w-[980px] items-center justify-between px-4 py-5 lg:flex">
        <div className="flex items-center gap-3">
          <InstagramGlyph size={34} yOffset={-3} />
          <InstagramWordmark width={110} />
          <span
            className="hidden sm:inline text-sm text-neutral-400 mx-1 align-middle"
            style={{ transform: "translateY(2px)", display: "inline-block" }}
          >
            by
          </span>
          <InstaSansoWordmark
            width={120}
            fontSize={24}
            className="hidden sm:inline align-middle"
          />
        </div>
      </header>

      <section className="mx-auto w-full max-w-[980px] px-4 pb-12">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md rounded-2xl bg-black/60 p-6 backdrop-blur-sm mx-auto">
            <div className="mb-5 flex items-center gap-2 lg:hidden">
              <InstagramGlyph size={28} yOffset={-1} />
              <InstagramWordmark width={96} />
              <span
                className="text-xs text-neutral-500 mx-1 align-middle"
                style={{ transform: "translateY(2px)", display: "inline-block" }}
              >
                by
              </span>
              <InstaSansoWordmark width={96} fontSize={22} />
            </div>

            <h2 className="mb-4 text-xl font-semibold">Crear cuenta</h2>
            <RegisterForm />

            <p className="mt-4 text-sm text-neutral-400">
              ¿Ya tenés una cuenta?{" "}
              <Link
                href="/login"
                className="font-medium bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-violet-500 
                     hover:from-pink-400 hover:to-violet-400 transition underline underline-offset-4 decoration-transparent hover:decoration-neutral-500"
              >
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
