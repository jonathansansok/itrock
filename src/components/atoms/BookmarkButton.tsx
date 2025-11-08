"use client";

type Props = {
  saved: boolean;
  toggleAction: () => void;   // antes: onToggle
  ariaLabelOn?: string;
  ariaLabelOff?: string;
};

export default function BookmarkButton({
  saved,
  toggleAction,
  ariaLabelOn = "Quitar de guardados",
  ariaLabelOff = "Guardar publicación",
}: Props) {
  return (
    <button
      type="button"
      onClick={toggleAction}
      aria-pressed={saved}
      aria-label={saved ? ariaLabelOn : ariaLabelOff}
      className="inline-flex items-center gap-1.5 select-none bg-transparent text-neutral-300 hover:text-neutral-100 transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-0"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className={saved ? "fill-neutral-100" : "fill-neutral-400"}>
        {saved ? <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2Z" /> : <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2Zm0 2v14.764l6-3 6 3V4H6Z" />}
      </svg>
    </button>
  );
}
