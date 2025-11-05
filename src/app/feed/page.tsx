//social-basic\src\app\feed\page.tsx
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
    <main className="mx-auto w-full max-w-screen-sm md:max-w-screen-md lg:max-w-2xl xl:max-w-3xl px-3 sm:px-4 py-4 text-gray-900">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg sm:text-xl font-semibold">Feed</h1>
        <form action="/api/auth/signout" method="post" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto rounded-xl border px-3 py-2">Salir</button>
        </form>
      </div>
  
      <ClientComposer />
      <FeedListClient />
    </main>
  );
}
