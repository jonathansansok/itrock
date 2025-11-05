"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("ada@example.com");
  const [password, setPassword] = useState("demo");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) { console.log("[LoginForm] email inválido"); return; }
    if (!password) { console.log("[LoginForm] password vacío"); return; }
    console.log("[LoginForm] signIn credentials:", email);
    await signIn("credentials", { email, password, callbackUrl: "/feed" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"
             className="w-full rounded-xl border px-3 py-2 text-sm" />
      <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña"
             className="w-full rounded-xl border px-3 py-2 text-sm" />
      <button type="submit" className="w-full rounded-xl bg-black px-3 py-2 text-white">Ingresar</button>
      <button type="button" onClick={() => { console.log("[LoginForm] signIn GitHub"); signIn("github", { callbackUrl: "/feed" }); }}
        className="w-full rounded-xl border px-3 py-2">Entrar con GitHub</button>
      <p className="text-sm">¿No tenés cuenta? <a href="/register" className="underline">Registrate</a></p>
    </form>
  );
}
