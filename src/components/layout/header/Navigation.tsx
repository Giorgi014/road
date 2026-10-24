import { SearchValue } from "@/components/ui";
import { NAV_LINKS } from "@/data";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

type NavigationProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navigation = ({ setMenuOpen }: NavigationProps) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5">
      <h1 className="shrink-0 font-display text-2xl font-bold tracking-[-0.02em] text-white no-underline">
        <Link to="/">ROAD</Link>
      </h1>
      <ul className="hidden items-center gap-10 list-none m-0 p-0 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.href}
              className="relative text-[11px] font-medium uppercase tracking-ultra text-white/60 no-underline transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] after:pointer-events-none after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:bg-white after:content-[''] after:transition-[width,left] after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:text-white hover:after:left-0 hover:after:w-full focus-visible:text-white focus-visible:after:left-0 focus-visible:after:w-full aria-[current=page]:text-white aria-[current=page]:after:left-0 aria-[current=page]:after:w-full"
            >
              {link.label}
            </NavLink>
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
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-electric-500 text-[9px] font-bold text-white">
            0
          </span>
        </button>
        <button
          type="button"
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-electric-500 to-electric-600 text-white transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_var(--blue-glow)] cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={18} strokeWidth={2} />
        </button>
      </div>
      {isSearch && <SearchValue onClose={() => setIsSearch(false)} />}
    </nav>
  );
};
