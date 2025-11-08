"use client";

type Props = { liked: boolean; count: number; toggleAction: () => void };

export default function HeartButton({ liked, count, toggleAction }: Props) {
  return (
    <button
      type="button"
      onClick={toggleAction}
      aria-pressed={liked}
      aria-label={liked ? "Quitar me gusta" : "Me gusta"}
      className="inline-flex items-center gap-1.5 select-none bg-transparent 
                 text-neutral-300 hover:text-neutral-100 transition-transform duration-150 
                 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        className={liked ? "fill-red-500" : "fill-neutral-400"}
      >
        {liked ? (
          <path d="M12.001 21.35s-1.45-1.01-3.3-2.63C6.09 16.34 2.5 13.28 2.5 9.5 2.5 6.42 4.92 4 8 4c1.74 0 3.41.81 4.001 2.09C12.59 4.81 14.26 4 16 4c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.59 6.84-6.2 9.22-1.85 1.62-3.299 2.63-3.299 2.63Z" />
        ) : (
          <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" />
        )}
      </svg>

      <span className={liked ? "text-neutral-100" : "text-neutral-400"}>{count}</span>
    </button>
  );
}
