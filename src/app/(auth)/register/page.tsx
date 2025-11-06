
"use client";

import { useSession } from "next-auth/react";
import RegisterForm from "@/components/molecules/RegisterForm";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-6 text-gray-900">
        Ya estás logueado. Ir al{" "}
        <Link href="/feed" className="underline text-blue-600 hover:text-blue-800">
          Feed
        </Link>
      </div>
    );
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Crear cuenta</h1>
        <RegisterForm />
        <p className="mt-4 text-sm text-gray-700">
          ¿Ya tenés una cuenta?{" "}
          <a href="/login" className="underline text-blue-600 hover:text-blue-800">
            Iniciá sesión
          </a>
        </p>
      </div>
    </main>
  );
}
