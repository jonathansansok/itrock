//social-basic\src\components\atoms\TextInput.tsx
"use client";
export default function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl border px-3 py-2 text-sm ${props.className||""}`} />;
}
