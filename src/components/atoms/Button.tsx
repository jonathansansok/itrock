"use client";
import { forwardRef } from "react";
import cn from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700";

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-neutral-900 text-neutral-100 border border-neutral-800 hover:bg-neutral-800",
  ghost: "bg-neutral-900/40 text-neutral-100 border border-neutral-800 hover:bg-neutral-800",
  outline: "bg-transparent text-neutral-100 border border-neutral-700 hover:bg-neutral-900/40",
  danger: "bg-red-600 text-white border border-red-700 hover:bg-red-500",
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", loading, leftIcon, rightIcon, children, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {leftIcon}
      {loading ? "Procesando…" : children}
      {rightIcon}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
