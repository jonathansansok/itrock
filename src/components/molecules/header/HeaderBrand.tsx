"use client";
import InstagramGlyph from "@/components/brand/InstagramGlyph";
import InstagramWordmark from "@/components/brand/InstagramWordmark";
import InstaSansoWordmark from "@/components/brand/InstaSansoWordmark";

export default function HeaderBrand() {
  return (
    <div className="flex items-center gap-2">
      <InstagramGlyph size={28} yOffset={-1} />
      <InstagramWordmark width={100} />
      <span
        className="mx-1 text-xs text-neutral-500 align-middle hidden md:inline-block"
        style={{ transform: "translateY(2px)" }}
      >
        by
      </span>
      <InstaSansoWordmark
        width={96}
        fontSize={22}
        className="hidden md:inline-block align-middle"
      />
    </div>
  );
}
