"use client";

type Props = {
  ariaLabel: string;
  pressed?: boolean;
  clickAction: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function IconButton({
  ariaLabel,
  pressed,
  clickAction,
  className = "",
  children,
}: Props) {
  return (
    <button
      type="button"
      onClick={clickAction}
      aria-label={ariaLabel}
      aria-pressed={pressed}
      className={[
        "inline-flex items-center gap-1.5 select-none",
        "bg-transparent text-neutral-300 hover:text-neutral-100",
        "transition-transform duration-150 active:scale-95",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
