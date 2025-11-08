"use client";

type Props = {
  count?: number;
  shareAction: () => void; 
};

export default function ShareButton({ count = 0, shareAction }: Props) {
  return (
    <button
      type="button"
      onClick={shareAction}
      aria-label="Compartir publicación"
      className="inline-flex items-center gap-1.5 select-none bg-transparent text-neutral-300 hover:text-neutral-100 transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-0"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className="fill-neutral-400">
        <path d="M18 8a3 3 0 1 0-2.816-4H15l-6.764 3.58a3 3 0 1 0 0 4.84L15 16a3.001 3.001 0 1 0 .816-1.816L8.236 11.4a3.05 3.05 0 0 0 0-1.8L15 6a3 3 0 0 0 3 2Z" />
      </svg>
      <span className="text-neutral-400">{count}</span>
    </button>
  );
}
