"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import TextInput from "@/components/atoms/TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("tu@example.com");
  const [password, setPassword] = useState("demo");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn("credentials", { email, password, callbackUrl: "/feed" });
      }}
      className="space-y-3"
    >
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

      <button
        type="submit"
        className="w-full rounded-xl bg-black px-3 py-2 text-white"
      >
        Ingresar
      </button>

      <button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/feed",
            prompt: "consent select_account",
          })
        }
        className="w-full rounded-xl border px-3 py-2"
      >
        Entrar con Google
      </button>
    </form>
  );
}
