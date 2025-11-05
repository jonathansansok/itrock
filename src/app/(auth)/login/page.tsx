import { getServerSession } from "next-auth";
import LoginForm from "@/components/molecules/LoginForm";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    return (
      <div className="p-6 text-gray-900">
        Ya estás logueado. Ir al{" "}
        <Link href="/feed" className="underline text-blue-600 hover:text-blue-800">
          Feed
        </Link>
      </div>
    );
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Iniciar sesión</h1>
        <LoginForm />
        <p className="mt-4 text-sm text-gray-700">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="underline text-blue-600 hover:text-blue-800">
            Registrate
          </a>
        </p>
      </div>
    </main>
  );
}
