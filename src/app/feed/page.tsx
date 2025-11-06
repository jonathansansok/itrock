import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientComposer from "./ClientComposer";
import FeedListClient from "./FeedListClient";
import AppHeader from "@/components/brand/AppHeader";
import StoriesBar from "@/components/molecules/StoriesBar";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[980px] px-3 sm:px-4 py-4">
        <div className="mx-auto w-full max-w-[680px]">
          <StoriesBar />
          <ClientComposer />
          <FeedListClient />
        </div>
      </main>
    </>
  );
}
