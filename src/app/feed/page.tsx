import { getServerSession } from "next-auth";
import Link from "next/link";
import { posts } from "@/lib/mockDb";
import FeedList from "@/components/organisms/FeedList";
import dynamic from "next/dynamic";

const PostComposer = dynamic(() => import("@/components/molecules/PostComposer"), { ssr: false }); // ✅

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

      <PostComposer />
      <FeedList posts={posts} />
    </main>
  );
}
