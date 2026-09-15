import type { ReactNode } from "react";

interface AuthBtnProps {
  children: ReactNode;
  variant: "login" | "registration";
  onClick?: () => void;
}

export const AuthBtn = ({ children, variant, onClick }: AuthBtnProps) => {
  return (
    <button
      type="submit"
      data-variant={variant}
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-[image:var(--pill-grad)] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_var(--blue-glow)] cursor-pointer"
    >
      {children}
    </button>
  );
};
