"use client";
import type { AvatarProps } from "@/interfaces/ui";

function hashToHue(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export default function Avatar({ name, size = 64, seed = name, emoji, className = "" }: AvatarProps) {
  const initials = name.split(/\s+/).map(p => p[0]?.toUpperCase()).slice(0, 2).join("") || "U";
  const h = hashToHue(seed);
  const h2 = (h + 40) % 360;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-full",
        "grid place-items-center text-white select-none",
        className,
      ].join(" ")}
      style={{ width: size, height: size, background: `conic-gradient(from 180deg, hsl(${h} 90% 55%), hsl(${h2} 80% 45%))` }}
      aria-label={name}
      title={name}
    >
      <div className="absolute inset-[2px] rounded-full bg-black/40" />
      <span className="relative z-10" style={{ fontSize: Math.round(size * 0.42), lineHeight: 1 }}>
        {emoji ?? initials}
      </span>
    </div>
  );
}
