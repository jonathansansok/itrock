import { getServerSession } from "next-auth";
import Link from "next/link";
import LoginForm from "@/components/molecules/LoginForm";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    return (
      <div className="p-6 text-neutral-200">
        Ya estás logueado. Ir al{" "}
        <Link
          href="/feed"
          className="underline text-blue-400 hover:text-blue-300"
        >
          Feed
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-black text-neutral-100">
      <header className="mx-auto flex w-full max-w-[980px] items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <InstagramGlyph size={34} yOffset={-3} />
          <InstagramWordmark width={110} />

          <span
            className="hidden sm:inline text-sm text-neutral-400 mx-1"
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

      {/* Grid hero (desktop) + card login */}
      <section className="mx-auto grid w-full max-w-[980px] grid-cols-1 px-4 pb-10 lg:grid-cols-2 lg:gap-8">
        {/* Hero izquierda (solo lg) */}
        <div className="hidden lg:flex flex-col justify-center">
          <h1 className="text-4xl font-semibold leading-tight">
            Mira los momentos cotidianos de{" "}
            <span className="brand-gradient">tus mejores amigos.</span>
          </h1>
          <p className="mt-4 max-w-[38ch] text-neutral-300">
            Compartí fotos y videos en tiempo real. Sumate a Instagram by J.
            Sansó y empezá ahora.
          </p>
        </div>

        {/* Card de login derecha */}
        <div className="flex min-h-[60vh] items-center">
          <div className="w-full max-w-sm sm:max-w-md rounded-2xl border border-neutral-800/80 bg-black/60 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm">
            {/* Header brand compacto en mobile */}
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
              <a
                href="/register"
                className="font-medium bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-violet-500 
             hover:from-pink-400 hover:to-violet-400 transition underline underline-offset-4 decoration-transparent hover:decoration-neutral-500"
              >
                Registrate
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
