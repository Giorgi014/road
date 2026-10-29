import { ArrowRight } from "lucide-react";
import type { ButtonProps } from "@/types";
import { Link } from "react-router-dom";

export const Button = ({ href, label, className = "" }: ButtonProps) => {
  return (
    <button type="button" className="border-none outline-none">
      <Link
        to={href}
        className={`group inline-flex items-center justify-between gap-2.5 rounded-full bg-(image:--pill-grad) px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_var(--blue-glow)] cursor-pointer ${className}`}
      >
        {label}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight size={14} />
        </span>
      </Link>
    </button>
  );
};
