"use client";

import { FileText, MessageSquare, Bookmark } from "lucide-react";

type Tab = "pubs" | "coms" | "saved";

export default function ProfileTabs({
  value,
  onChangeAction,
}: {
  value: Tab;
  onChangeAction: (t: Tab) => void;
}) {
  const base =
    "flex-1 min-w-[60px] sm:min-w-[100px] rounded-full px-3 sm:px-4 py-2 text-sm sm:flex-none flex items-center justify-center gap-1.5";
  const active = "bg-neutral-800 text-white";
  const inactive = "bg-neutral-900/50 text-neutral-300";

  return (
    <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
      <button
        onClick={() => onChangeAction("pubs")}
        className={`${base} ${value === "pubs" ? active : inactive}`}
      >
        <FileText size={16} />
        <span className="hidden sm:inline">Publicaciones</span>
        <span className="sm:hidden text-xs">Pubs</span>
      </button>

      <button
        onClick={() => onChangeAction("coms")}
        className={`${base} ${value === "coms" ? active : inactive}`}
      >
        <MessageSquare size={16} />
        <span className="hidden sm:inline">Comentarios</span>
        <span className="sm:hidden text-xs">Coms</span>
      </button>

      <button
        onClick={() => onChangeAction("saved")}
        className={`${base} ${value === "saved" ? active : inactive}`}
      >
        <Bookmark size={16} />
        <span className="hidden sm:inline">Guardados</span>
        <span className="sm:hidden text-xs">Saves</span>
      </button>
    </div>
  );
}
