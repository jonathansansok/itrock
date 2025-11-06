import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientComposer from "./ClientComposer";
import FeedListClient from "./FeedListClient";
import AppHeader from "@/components/brand/AppHeader";
import StoriesBar from "@/components/molecules/StoriesBar";
import { getInitialPosts } from "@/lib/server/getInitialPosts";
import FeedHydrator from "@/components/providers/FeedHydrator";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const initialPosts = await getInitialPosts();
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[980px] px-3 sm:px-4 py-4">
        <div className="mx-auto w-full max-w-[680px]">
          <StoriesBar />
          <FeedHydrator posts={initialPosts} />
          <ClientComposer />
          <FeedListClient initialPosts={initialPosts} />
        </div>
      </main>
    </>
  );
}
