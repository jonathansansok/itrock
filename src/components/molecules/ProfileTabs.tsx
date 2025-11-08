"use client";

type Tab = "pubs" | "coms" | "saved";

export default function ProfileTabs({
  value,
  changeAction,
}: {
  value: Tab;
  changeAction: (t: Tab) => void;
}) {
  const base =
    "flex-1 min-w-[100px] rounded-full px-4 py-2 text-sm sm:flex-none";
  const active = "bg-neutral-800 text-white";
  const inactive = "bg-neutral-900/50 text-neutral-300";

  return (
    <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
      <button
        onClick={() => changeAction("pubs")}
        className={`${base} ${value === "pubs" ? active : inactive}`}
      >
        Publicaciones
      </button>
      <button
        onClick={() => changeAction("coms")}
        className={`${base} ${value === "coms" ? active : inactive}`}
      >
        Comentarios
      </button>
      <button
        onClick={() => changeAction("saved")}
        className={`${base} ${value === "saved" ? active : inactive}`}
      >
        Guardados
      </button>
    </div>
  );
}
