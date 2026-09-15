import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ButtonProps {
  href: string;
  label: string;
}

export const Button = ({ href, label }: ButtonProps) => {
  return (
    <Link
      to={href}
      className="group inline-flex items-center gap-3 rounded-full bg-[image:var(--pill-grad)] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_var(--blue-glow)]"
    >
      {label}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight size={14} />
      </span>
    </Link>
  );
};
