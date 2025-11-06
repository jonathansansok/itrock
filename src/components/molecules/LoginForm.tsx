"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import TextInput from "@/components/atoms/TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        setLoading(true);
        try {
          await signIn("credentials", { email, password, callbackUrl: "/feed" });
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-3"
      noValidate
    >
      <TextInput
        type="email"
        required
        autoComplete="username"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="Email"
      />

      <TextInput
        type="password"
        required
        minLength={3}
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        aria-label="Contraseña"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 transition
                   hover:bg-neutral-800 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      {/* Google — moderno, sin “tachado” y multicolor */}
      <button
        type="button"
        aria-label="Entrar con Google"
        onClick={() =>
          signIn("google", { callbackUrl: "/feed", prompt: "consent select_account" })
        }
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2
                   hover:bg-neutral-800 active:scale-95 transition
                   flex items-center justify-center gap-2 focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-neutral-700"
      >
        {/* G multicolor oficial */}
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
