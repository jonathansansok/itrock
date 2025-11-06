//social-basic\src\app\feed\page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientComposer from "./ClientComposer";
import FeedListClient from "./FeedListClient";
import LogoutButton from "@/components/molecules/LogoutButton";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {

    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-screen-sm md:max-w-3xl lg:max-w-2xl xl:max-w-3xl px-3 sm:px-4 py-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-white">Feed</h1>
        <LogoutButton />
      </div>

      <ClientComposer />
      <FeedListClient />
    </main>
  );
}
