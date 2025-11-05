"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/slices/usersSlice";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const d = useDispatch();
  const [name, setName] = useState("Ada");
  const [email, setEmail] = useState("tu@example.com");
  const [password, setPassword] = useState("demo");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const passOk = password.length >= 3;
    if (!emailOk) { console.log("[RegisterForm] email inválido"); return; }
    if (!passOk) { console.log("[RegisterForm] password corto"); return; }

    d(addUser({ id: email, name: name || email.split("@")[0], email }));
    console.log("[RegisterForm] guardado en local, signIn…");
    await signIn("credentials", { name, email, password, callbackUrl: "/feed" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre"
             className="w-full rounded-xl border px-3 py-2 text-sm" />
      <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"
             className="w-full rounded-xl border px-3 py-2 text-sm" />
      <input required minLength={3} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña"
             className="w-full rounded-xl border px-3 py-2 text-sm" />
      <button type="submit" className="w-full rounded-xl bg-black px-3 py-2 text-white">Crear cuenta</button>
    </form>
  );
}
