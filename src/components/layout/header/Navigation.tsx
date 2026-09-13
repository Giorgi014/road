import { SearchValue } from "@/components/ui/Search";
import { NAV_LINKS } from "@/data/content";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type NavigationProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navigation = ({ setMenuOpen }: NavigationProps) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6">
      <Link to="/">
        <h1 className="shrink-0 font-display text-2xl font-bold tracking-[-0.02em] text-white no-underline">
          ROAD
        </h1>
      </Link>
      <ul className="hidden items-center gap-10 list-none m-0 p-0 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/60 no-underline transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-white/70 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
          onClick={() => setIsSearch(true)}
        >
          <Search size={18} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          aria-label="Cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-white/70 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
        >
          <ShoppingBag size={18} strokeWidth={1.8} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3155ff] text-[9px] font-bold text-white">
            0
          </span>
        </button>
        <button
          type="button"
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3155ff] to-[#6847ff] text-white transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)] cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={18} strokeWidth={2} />
        </button>
      </div>
      {isSearch && <SearchValue onClose={() => setIsSearch(false)} />}
    </nav>
  );
};
