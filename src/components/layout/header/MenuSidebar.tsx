import { AuthModal } from "@/components/authorization/AuthModal";
import { SIDEBAR_LINKS } from "@/data/content";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type MenuSidebarProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuSidebar = ({ menuOpen, setMenuOpen }: MenuSidebarProps) => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-[448px] bg-ink-700 p-8 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-12 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-white">
            ROAD
          </span>
          <button
            type="button"
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <ul className="m-0 list-none p-0">
          {SIDEBAR_LINKS.map((link, i) => {
            const isAuth = link.action === "auth";

            return (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="flex items-center gap-4 border-b border-white/5 py-4 text-white/80 no-underline transition-all hover:translate-x-2 hover:text-white"
                  onClick={(e) => {
                    if (isAuth) {
                      e.preventDefault();
                      setAuthOpen(true);
                      return;
                    }
                    setMenuOpen(false);
                  }}
                >
                  <span className="font-sans text-[12px] text-(--ink-dim)">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[30px] font-medium text-white">
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto pt-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-white/40">
            Future Techwear
          </p>
          <p className="text-sm text-white/50">
            Engineered for explorers. Built for the next century.
          </p>
        </div>
      </aside>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
};
