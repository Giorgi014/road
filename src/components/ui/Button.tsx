import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ButtonProps } from "@/types";

export const Button = (props: ButtonProps) => {
  if (props.variant === "action") {
    return (
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-(image:--pill-grad) px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 ${props.className ?? ""}`}
      >
        {props.label}
        {props.icon}
      </button>
    );
  }

  return (
    <span className="inline-flex">
      <Link
        to={props.href}
        className={`group inline-flex cursor-pointer items-center justify-between gap-2.5 rounded-full bg-(image:--pill-grad) px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_var(--blue-glow)] ${props.className ?? ""}`}
      >
        {props.label}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight size={14} />
        </span>
      </Link>
    </span>
  );
};
