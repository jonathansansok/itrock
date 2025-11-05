
import Link from "next/link";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("@/components/molecules/RegisterForm"), { ssr: false }); // ✅

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    return <div className="p-6">Ya estás logueado. Ir al <Link href="/feed" className="underline">Feed</Link></div>;
  }
  return (
    <main className="grid min-h-dvh place-items-center">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Crear cuenta</h1>
        <RegisterForm />
        <p className="mt-4 text-sm">
          ¿Ya tenés cuenta? <Link href="/login" className="underline">Ingresar</Link>
        </p>
      </div>
    </main>
  );
}
