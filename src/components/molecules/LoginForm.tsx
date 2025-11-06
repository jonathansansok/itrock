"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { isValidEmail, isStrongPassword } from "@/lib/validators";

async function toastError(msg: string) {
  const Swal = (await import("sweetalert2")).default;

  const closeOnAnyPointer = () => Swal.close();

  if (Swal.isVisible()) Swal.close();

  await Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: msg,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    allowEscapeKey: true,
    allowOutsideClick: true,
    didOpen: (toast) => {
      // cerrar al click en el propio toast
      toast.addEventListener("click", () => Swal.close());
      // cerrar al primer click en cualquier parte
      document.addEventListener("pointerdown", closeOnAnyPointer, { once: true, capture: true });
    },
    willClose: () => {
      document.removeEventListener("pointerdown", closeOnAnyPointer, true);
    },
  });
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const emailOk = isValidEmail(email);
  const passOk = isStrongPassword(password);
  const canSubmit = emailOk && passOk && !loading;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOk) return toastError("Email inválido.");
    if (!passOk) return toastError("Mínimo 8 caracteres, 1 mayúscula y 1 número.");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/feed",
      });
      if (res?.error) return toastError("Credenciales incorrectas.");
      if (res?.ok) window.location.href = res.url ?? "/feed";
    } catch {
      toastError("No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <input
        type="email"
        required
        autoComplete="username"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        placeholder="Email"
        aria-label="Email"
        aria-invalid={touched.email ? !emailOk : undefined}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-700"
      />
      {touched.email && !emailOk && (
        <p className="text-xs text-red-400">Ingresá un email válido (ej. usuario@dominio.com).</p>
      )}

      <input
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        placeholder="Contraseña"
        aria-label="Contraseña"
        aria-invalid={touched.password ? !passOk : undefined}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-700"
      />
      {touched.password && !passOk && (
        <p className="text-xs text-red-400">Mínimo 8 caracteres, con una mayúscula y un número.</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 transition
                   hover:bg-neutral-800 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      <button
        type="button"
        aria-label="Entrar con Google"
        onClick={() => signIn("google", { callbackUrl: "/feed", prompt: "consent select_account" })}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2
                   hover:bg-neutral-800 active:scale-95 transition
                   flex items-center justify-center gap-2 focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-neutral-700"
      >
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.7 0 7.1 1.3 9.7 3.8l7.2-7.2C36.7 2.2 30.7 0 24 0 14.6 0 6.5 5.4 2.6 13.3l8.4 6.5C13 14 18 9.5 24 9.5z"/>
          <path fill="#FBBC05" d="M46.5 24.5c0-1.6-.2-3.2-.6-4.7H24v9h12.8c-.6 3-2.4 5.5-5.1 7.3l7.9 6.1c4.7-4.4 6.9-10.8 6.9-17.7z"/>
          <path fill="#34A853" d="M11 27.8c-1-3-1-6.2 0-9.2l-8.4-6.5C.9 15.6 0 19.7 0 24c0 4.3.9 8.4 2.6 12l8.4-6.5z"/>
          <path fill="#4285F4" d="M24 48c6.5 0 12-2.1 16-5.7l-7.9-6.1c-2.2 1.5-5 2.3-8.1 2.3-6 0-11.1-4.5-12.9-10.5L2.6 36C6.5 42.6 14.6 48 24 48z"/>
        </svg>
        <span className="text-neutral-100">Entrar con Google</span>
      </button>
    </form>
  );
}
