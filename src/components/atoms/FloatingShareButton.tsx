
"use client";
import { Share2 } from "lucide-react";
import { shareSmart } from "@/lib/share";

export default function FloatingShareButton() {
  const handleShare = () => {
    shareSmart(
      window.location.href,
      "Compartir publicación",
      "Mirá esta publicación en nuestra red social:"
    );
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-6 right-6 flex flex-col items-center gap-1 rounded-full bg-green-600 text-white p-3 shadow-lg hover:bg-green-500 active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
    >
      <Share2 className="h-5 w-5" />
      <span className="text-[10px] font-medium leading-tight">Compartir</span>
    </button>
  );
}
