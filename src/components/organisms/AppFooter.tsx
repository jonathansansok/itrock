export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-neutral-800/60 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[980px] px-4 py-8 text-sm text-neutral-400 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-200">Instagram {year}</span>
          <span className="hidden sm:inline h-1 w-1 rounded-full bg-neutral-600" />
          <span className="text-neutral-400">by J. Sansó</span>
        </div>
      </div>
    </footer>
  );
}
