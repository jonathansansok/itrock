"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/slices/usersSlice";
import { signIn } from "next-auth/react";
import TextInput from "@/components/atoms/TextInput";
import { isValidEmail, isStrongPassword } from "@/lib/validators";

const inputCls =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 " +
  "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-700";

export default function RegisterForm() {
  const d = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; password?: boolean; confirm?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const emailOk = isValidEmail(email);
  const passOk = isStrongPassword(password);
  const confirmOk = confirm === password && passOk;
  const nameOk = name.trim().length >= 2;
  const canSubmit = nameOk && emailOk && passOk && confirmOk && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      d(addUser({ id: email, name: name || email.split("@")[0], email }));
      await signIn("credentials", { name, email, password, callbackUrl: "/feed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <TextInput
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        placeholder="Nombre"
        aria-label="Nombre"
        aria-invalid={touched.name ? !nameOk : undefined}
        className={inputCls}
      />
      {touched.name && !nameOk && <p className="text-xs text-red-400">Ingresá tu nombre (mínimo 2 caracteres).</p>}

      <TextInput
        required
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        placeholder="Email"
        aria-label="Email"
        aria-invalid={touched.email ? !emailOk : undefined}
        className={inputCls}
      />
      {touched.email && !emailOk && <p className="text-xs text-red-400">Email inválido (ej: usuario@dominio.com).</p>}

      <TextInput
        required
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        placeholder="Contraseña"
        aria-label="Contraseña"
        aria-invalid={touched.password ? !passOk : undefined}
        className={inputCls}
      />
      {touched.password && !passOk && <p className="text-xs text-red-400">Mínimo 8 caracteres, 1 mayúscula y 1 número.</p>}

      <TextInput
        required
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
        placeholder="Confirmar contraseña"
        aria-label="Confirmar contraseña"
        aria-invalid={touched.confirm ? !confirmOk : undefined}
        className={inputCls}
      />
      {touched.confirm && !confirmOk && <p className="text-xs text-red-400">Las contraseñas no coinciden.</p>}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 transition
                   hover:bg-neutral-800 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creando…" : "Crear cuenta"}
      </button>
    </form>
  );
}
