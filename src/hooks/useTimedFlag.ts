"use client";
import { useCallback, useRef, useState } from "react";

export function useTimedFlag(ms = 3000) {
  const [on, setOn] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    if (t.current) clearTimeout(t.current);
    setOn(true);
    t.current = setTimeout(() => setOn(false), ms);
  }, [ms]);

  const off = useCallback(() => {
    if (t.current) clearTimeout(t.current);
    setOn(false);
  }, []);

  return { on, trigger, off };
}
