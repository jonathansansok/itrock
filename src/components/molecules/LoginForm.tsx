//social-basic\src\components\molecules\LoginForm.tsx
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

      <button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/feed",
            prompt: "consent select_account",
          })
        }
        className="group w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 transition
                   hover:bg-neutral-800 active:scale-95 flex items-center justify-center gap-2"
      >
 
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#EA4335" d="M9 7.3h8.4c.1.5.2 1 .2 1.6 0 4.6-3.1 7.9-7.6 7.9A8 8 0 0 1 1 9a8 8 0 0 1 8-8c2.2 0 4 .8 5.3 2l-2.2 2A4.9 4.9 0 0 0 9 3.9 5.1 5.1 0 0 0 3.9 9 5.1 5.1 0 0 0 9 14.1c2.6 0 4.2-1.5 4.6-3.6H9V7.3Z"/>
        </svg>
        <span className="text-neutral-100">
          Entrar con Google
        </span>

        <span className="pointer-events-none absolute h-px w-0 bg-neutral-400 transition-all duration-300 group-hover:w-1/2" />
      </button>
    </form>
  );
}
