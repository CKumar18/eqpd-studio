import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  arrow?: boolean;
}

const variants = {
  primary:
    "gradient-bg text-white hover:opacity-90 shadow-lg shadow-brand-500/25",
  outline:
    "border border-brand-500 text-brand-500 hover:bg-brand-500/10 bg-transparent",
  ghost:
    "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 bg-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  arrow = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
      {arrow && <ArrowRight size={16} />}
    </button>
  );
}
