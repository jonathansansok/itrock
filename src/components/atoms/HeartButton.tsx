"use client";
type Props = {
  liked: boolean;
  count: number;
  onToggle: () => void;
};

export default function HeartButton({ liked, count, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={liked}
      aria-label={liked ? "Quitar me gusta" : "Me gusta"}
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm",
        "transition-[transform,background-color,color,border-color] duration-150",
        "active:scale-95 select-none",
        liked ? "border-red-200 bg-red-50 text-red-600" : "hover:bg-gray-50"
      ].join(" ")}
    >
      {/* SVG Instagram-like (24px) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="24" height="24"
        className={liked ? "fill-current" : "fill-current"}
      >
        {liked ? (
          // filled
          <path d="M12.001 21.35s-1.45-1.01-3.3-2.63C6.09 16.34 2.5 13.28 2.5 9.5 2.5 6.42 4.92 4 8 4c1.74 0 3.41.81 4.001 2.09C12.59 4.81 14.26 4 16 4c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.59 6.84-6.2 9.22-1.85 1.62-3.299 2.63-3.299 2.63Z"/>
        ) : (
          // outline
          <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
        )}
      </svg>

      <span className={liked ? "font-medium" : ""}>{count}</span>
    </button>
  );
}
