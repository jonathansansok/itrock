import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LoginForm from "@/components/molecules/LoginForm";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";
import LoginCallbackGuard from "@/components/guards/LoginCallbackGuard";
import LoggedInBanner from "@/components/molecules/LoggedInBanner";
import type { Viewport } from "next";

export const viewport: Viewport = { themeColor: "#000000" };

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    return <LoggedInBanner dest="/feed" />;
  }

  return (
    <main className="relative min-h-dvh bg-black text-neutral-100">
      <LoginCallbackGuard />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(236,72,153,0.20),transparent_60%),radial-gradient(500px_250px_at_80%_0%,rgba(139,92,246,0.18),transparent_60%)]"
      />

      <header className="hidden lg:flex mx-auto w-full max-w-[980px] items-center justify-between px-4 py-5">
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

      <section className="mx-auto grid w-full max-w-[980px] grid-cols-1 px-4 pb-12 lg:grid-cols-2 lg:gap-8">
        {/* Lado izquierdo: claim */}
        <div className="hidden lg:flex flex-col justify-center">
          <h1 className="text-4xl font-semibold leading-tight">
            Mirá los momentos cotidianos de{" "}
            <span className="brand-gradient">tus mejores amigos.</span>
          </h1>
          <p className="mt-4 max-w-[38ch] text-neutral-300">
            Compartí fotos y videos en tiempo real. Sumate a Instagram by J.
            Sansó y empezá ahora.
          </p>
        </div>

        {/* Card login */}
        <div className="flex min-h-[60vh] items-center">
          <div className="w-full max-w-sm sm:max-w-md rounded-2xl bg-black/60 p-6 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-2 lg:hidden">
              <InstagramGlyph size={28} yOffset={-1} />
              <InstagramWordmark width={96} />
              <span className="text-xs text-neutral-500 mx-1">by</span>
              <InstaSansoWordmark width={96} fontSize={22} />
            </div>

            <h2 className="mb-4 text-xl font-semibold">Iniciar sesión</h2>
            <LoginForm />

            <p className="mt-4 text-sm text-neutral-400">
              ¿No tenés cuenta?{" "}
              <Link
                href="/register"
                className="font-medium bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-violet-500 
                           hover:from-pink-400 hover:to-violet-400 transition underline underline-offset-4 decoration-transparent hover:decoration-neutral-500"
              >
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
