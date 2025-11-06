// src/components/molecules/LoginForm.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import TextInput from "@/components/atoms/TextInput";

function GoogleIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 533.5 544.3" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M533.5 278.4c0-17.9-1.6-35.1-4.6-51.7H272v97.8h146.9c-6.3 34-25.2 62.8-53.6 82v67h86.7c50.7-46.7 81.5-115.5 81.5-195.1z"/>
      <path fill="#34A853" d="M272 544.3c73.6 0 135.4-24.3 180.6-66.8l-86.7-67c-24.1 16.2-55 25.8-93.9 25.8-72 0-133-48.6-154.8-114.1h-90v71.6C72 483.7 165.3 544.3 272 544.3z"/>
      <path fill="#4A90E2" d="M117.2 322.2a165 165 0 0 1 0-100.1v-71.6h-90A272 272 0 0 0 0 272c0 44.2 10.7 85.8 29.6 121.5l87.6-71.3z"/>
      <path fill="#FBBC05" d="M272 107.7c39.9 0 75.7 13.7 104 40.5l78-78C406.9 26.3 345.3 0 272 0 165.3 0 72 60.6 29.6 150.5l87.6 71.6C139 156.6 200 107.7 272 107.7z"/>
    </svg>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("tu@example.com");
  const [password, setPassword] = useState("demo");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/feed" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <TextInput
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <TextInput
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />

      {/* Botón Ingresar – mismo estilo base */}
      <button
        type="submit"
        className="w-full rounded-xl border border-neutral-800 bg-black px-3 py-2 text-neutral-100 hover:bg-neutral-900 active:scale-[0.98] transition 
                   focus:outline-none focus:ring-2 focus:ring-neutral-700"
      >
        Ingresar
      </button>

      {/* Google Moderno */}
      <button
        type="button"
        onClick={() =>
          signIn("google", { callbackUrl: "/feed", prompt: "consent select_account" })
        }
        className="group w-full rounded-xl border border-neutral-800 bg-black/70 px-3 py-2 text-neutral-100 
                   hover:bg-neutral-900 active:scale-[0.98] transition 
                   focus:outline-none focus:ring-2 focus:ring-blue-600/40"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="rounded-md">
            <GoogleIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
          </span>
          <span className="text-sm">Ingresar con Google</span>
        </span>
      </button>
    </form>
  );
}
