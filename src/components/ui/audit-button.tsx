"use client";

import Link from "next/link";

type AuditButtonProps = {
  className?: string;
  href?: string;
  size?: "hero";
};

const sizeClasses = {
  hero: "min-h-13 px-6 text-sm md:min-h-14 md:px-7 md:text-[0.95rem]"
} as const;

export function AuditButton({
  className = "",
  href = "/contact",
  size = "hero"
}: AuditButtonProps) {
  return (
    <Link
      href={href}
      className={`glass-pill relative z-[50] inline-flex items-center justify-center rounded-full font-medium text-[var(--foreground)] transition duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/10 ${sizeClasses[size]} ${className}`}
    >
      Get an audit
    </Link>
  );
}
