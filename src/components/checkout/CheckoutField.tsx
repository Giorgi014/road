import type { ReactNode } from "react";

export const CheckoutField = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) => (
  <label
    className={`text-xs uppercase tracking-wide text-white/55 ${className}`}
  >
    {label}
    {children}
  </label>
);
