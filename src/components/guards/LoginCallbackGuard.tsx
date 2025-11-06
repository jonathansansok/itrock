"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginCallbackGuard() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const err = params.get("error");
    if (err === "Callback") {
      // SweetAlert2 on demand: evita problemas de SSR
      import("sweetalert2").then(({ default: Swal }) => {
        Swal.fire({
          icon: "info",
          title: "Inicio cancelado",
          text: "Cancelaste el inicio con Google.",
          timer: 2200,
          showConfirmButton: false,
          background: "#0a0a0a",
          color: "#e5e5e5",
          backdrop: "rgba(0,0,0,0.3)",
        });
      });

      // Limpia la URL a /login (sin query) manteniéndote en la misma page
      router.replace("/login");
    }
  }, [params, router]);

  return null;
}
