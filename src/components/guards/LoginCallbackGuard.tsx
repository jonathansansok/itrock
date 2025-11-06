"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginCallbackGuard() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const err = params.get("error");
    if (err === "Callback") {
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

      router.replace("/login");
    }
  }, [params, router]);

  return null;
}
