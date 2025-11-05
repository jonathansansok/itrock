import { getServerSession } from "next-auth";
import Link from "next/link";
import ClientComposer from "./ClientComposer";
import FeedListClient from "./FeedListClient";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="p-6 text-gray-900">
        No estás autenticado. Ir a{" "}
        <Link className="underline text-blue-600 hover:text-blue-800" href="/login">
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6 text-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feed</h1>
        <form action="/api/auth/signout" method="post">
          <button className="rounded-xl border px-3 py-2">Salir</button>
        </form>
      </div>

      {/* Cliente para interacciones */}
      <ClientComposer />

      {/* Cliente que lee Redux y pinta el timeline */}
      <FeedListClient />
    </main>
  );
}
