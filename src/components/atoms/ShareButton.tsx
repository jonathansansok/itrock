"use client";

import Swal from "sweetalert2";

type Props = {
  count: number;
  url: string;
};

export default function ShareButton({ count, url }: Props) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Enlace copiado 📋",
        text: "Pegalo donde quieras compartirlo.",
        showConfirmButton: false,
        timer: 2000,
        background: "#0a0a0a",
        color: "#e5e5e5",
      });
    } catch {
      alert(`Copiá este enlace:\n${url}`);
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Compartir"
      className="inline-flex items-center gap-1.5 select-none 
                 text-neutral-300 hover:text-neutral-100 transition-transform 
                 duration-150 active:scale-95 focus:outline-none 
                 focus-visible:ring-1 focus-visible:ring-neutral-700"
    >
      <svg
        aria-label="Compartir"
        fill="currentColor"
        height="23"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Compartir</title>
        <path
          d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="7.488"
          x2="15.515"
          y1="12.208"
          y2="7.641"
        ></line>
      </svg>
      <span className="text-sm">{count}</span>
    </button>
  );
}
