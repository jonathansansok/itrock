//social-basic\src\components\molecules\LogoutButton.tsx
"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
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
      // dark theme
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
      className="w-full sm:w-auto rounded-xl border border-neutral-700 px-3 py-2 text-white hover:bg-neutral-900 disabled:opacity-60"
      aria-busy={loading}
    >
      {loading ? "Cerrando..." : "Cerrar sesión"}
    </button>
  );
}
