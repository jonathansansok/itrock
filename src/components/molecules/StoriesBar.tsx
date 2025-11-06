"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Avatar from "@/components/atoms/Avatar";
import { DUM_USERS } from "@/lib/DumUsers";
import type { Story } from "@/interfaces/social";

export default function StoriesBar() {
  const demo: Story[] = DUM_USERS.slice(0, 20).map((u) => ({
    id: u.id,
    name: u.name,
    emoji: u.emoji,
  }));

  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxLeft = scrollWidth - clientWidth;
    setCanLeft(scrollLeft > 2);
    setCanRight(scrollLeft < maxLeft - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateArrows();

    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative mb-4 rounded-2xl border border-neutral-800/80 bg-black/60 p-3 sm:p-4 overflow-hidden">
      {/* Fades laterales solo si hay overflow */}
      {(canLeft || canRight) && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-black/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-black/70 to-transparent" />
        </>
      )}

      <ul
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
        aria-label="Historias"
      >
        {demo.map((s) => (
          <li key={s.id} className="shrink-0 text-center">
            <div className="mx-auto h-16 w-16 rounded-full p-0.5 bg-linear-to-tr from-pink-500 via-red-500 to-violet-500">
              <div className="h-full w-full rounded-full bg-black p-0.5">
                <Avatar name={s.name} emoji={s.emoji} size={56} />
              </div>
            </div>
            <p className="mt-1 w-20 truncate text-center text-xs text-neutral-300">{s.name}</p>
          </li>
        ))}
      </ul>

      {/* Flecha izquierda: solo si hay para scrollear */}
      {canLeft && (
        <button
          type="button"
          aria-label="Ver historias anteriores"
          onClick={() => scrollByAmount("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-neutral-800/80 bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 active:scale-95 transition"
        >
          {/* chevron-left */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-neutral-200">
            <path fill="currentColor" d="M15.5 19.5L8.5 12l7-7.5 1.5 1.4L11.7 12l5.3 5.1z" />
          </svg>
        </button>
      )}

      {/* Flecha derecha: solo si hay para scrollear */}
      {canRight && (
        <button
          type="button"
          aria-label="Ver historias siguientes"
          onClick={() => scrollByAmount("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-neutral-800/80 bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 active:scale-95 transition"
        >
          {/* chevron-right */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-neutral-200">
            <path fill="currentColor" d="M8.5 4.5L15.5 12l-7 7.5-1.5-1.4L12.3 12 7 6.9z" />
          </svg>
        </button>
      )}
    </div>
  );
}
