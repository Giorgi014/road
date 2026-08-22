import { ArrowRight } from "lucide-react";

interface ButtonProps {
  href: string;
  label: string;
}

export const Button = ({ href, label }: ButtonProps) => {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#3155ff_0%,#6847ff_100%)] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_rgba(49,85,255,0.8)]"
    >
      {label}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight size={14} />
      </span>
    </a>
  );
};
