"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Swal from "sweetalert2";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    const res = await Swal.fire({
      title: "Cerrar sesión",
      text: "¿Seguro desea cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      background: "#111",
      color: "#fff",
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#374151",
      focusCancel: true,
    });

    if (res.isConfirmed) {
      setLoading(true);
      await signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      aria-label="Cerrar sesión"
      title="Cerrar sesión"
      className="
        inline-flex items-center justify-center rounded-full transition active:scale-95
        bg-transparent hover:bg-transparent
        md:bg-neutral-900/50 md:hover:bg-neutral-800 md:border md:border-neutral-800
        w-8 h-8 p-0.5 md:w-auto md:h-auto md:px-2 md:py-1.5
        text-neutral-300
        disabled:opacity-60
      "
    >
      <LogOut className="w-5 h-5 md:w-[22px] md:h-[22px]" />
      <span className="hidden md:inline ml-2 text-sm">Salir</span>
    </button>
  );
}
