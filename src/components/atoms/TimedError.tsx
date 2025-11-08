// src/components/atoms/TimedError.tsx
"use client";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  ms?: number;
  onCloseAction?: () => void;
};

export default function TimedError({ text, ms = 3000, onCloseAction }: Props) {
  const [w, setW] = useState(100);

  useEffect(() => {
    const id = setTimeout(() => onCloseAction?.(), ms);
    const raf = requestAnimationFrame(() => setW(0));
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [ms, onCloseAction]);

  return (
    <div className="relative rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
      {text}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-red-400/80 transition-[width]"
        style={{ width: `${w}%`, transitionDuration: `${ms}ms` }}
      />
    </div>
  );
}
