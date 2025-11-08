import AppHeader from "@/components/organisms/AppHeader";
import { getInitialPosts } from "@/lib/server/getInitialPosts";
import ProfileClient from "./ProfileClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = decodeURIComponent(id);
  const initialPosts = await getInitialPosts();

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[980px]">
        <div className="px-3 sm:px-4 pt-4">
          <h1 className="text-xl font-semibold text-neutral-100">
            Perfil — {userId}
          </h1>
          <p className="text-sm text-neutral-400">
            Actividad del usuario en el feed
          </p>
        </div>
        <ProfileClient userId={userId} initialPosts={initialPosts} />
      </main>
    </>
  );
}
