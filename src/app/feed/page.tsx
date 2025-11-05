import { getServerSession } from "next-auth";
import Link from "next/link";
import { posts } from "@/lib/mockDb";
import FeedList from "@/components/organisms/FeedList";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    return <div className="p-6">No autenticado. Ir a <Link className="underline" href="/login">Login</Link></div>;
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feed</h1>
        <form action="/api/auth/signout" method="post">
          <button className="rounded-xl border px-3 py-2">Salir</button>
        </form>
      </div>
      <FeedList posts={posts} />
    </main>
  );
}
