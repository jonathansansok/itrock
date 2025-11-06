"use client";

import Link from "next/link";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";

export default function LoggedInBanner({ dest = "/feed" }: { dest?: string }) {
  return (
    <main className="relative grid min-h-dvh place-items-center bg-black text-neutral-100 px-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(236,72,153,0.20),transparent_60%),radial-gradient(500px_250px_at_80%_0%,rgba(139,92,246,0.18),transparent_60%)]"
      />
      <div className="w-full max-w-md rounded-2xl border border-neutral-800/80 bg-black/60 p-6 text-center backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="mb-4 flex items-center justify-center gap-2">
          <InstagramGlyph size={28} yOffset={-1} />
          <InstagramWordmark width={96} />
          <span
            className="text-xs text-neutral-500 align-middle"
            style={{ transform: "translateY(2px)", display: "inline-block" }}
          >
            by
          </span>
          <InstaSansoWordmark width={96} fontSize={22} />
        </div>

        <h2 className="text-lg font-semibold">Ya estás logueado</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Continuá al feed para ver las últimas publicaciones.
        </p>

        <Link
          href={dest}
          className="mt-4 inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 px-5 py-2.5 text-sm font-medium text-white transition active:scale-95 hover:bg-neutral-800"
        >
          Ir al Feed
        </Link>
      </div>
    </main>
  );
}
