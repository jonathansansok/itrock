import { getServerSession } from "next-auth";
import LoginForm from "@/components/molecules/LoginForm";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    return <div className="p-6">Ya estás logueado. Ir al <Link href="/feed" className="underline">Feed</Link></div>;
  }
  return (
    <main className="grid min-h-dvh place-items-center">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </main>
  );
}
