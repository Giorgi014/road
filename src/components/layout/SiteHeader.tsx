import { forwardRef, useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../data/content";

interface SiteHeaderProps {
  variant?: "overlay" | "solid";
}

const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(
  ({ variant = "solid" }, ref) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      if (variant !== "solid") return;
      const onScroll = () => setScrolled(window.scrollY > 24);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, [variant]);

    const headerClass = [
      "fixed inset-x-0 top-0 z-50 px-0 py-5 transition-all duration-500",
      variant === "overlay" ? "bg-transparent" : "border-b border-transparent",
      scrolled
        ? "bg-[rgba(10,14,39,0.8)] py-3 backdrop-blur-xl border-white/5"
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <header ref={ref} className={headerClass}>
          <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6">
            <a
              href="#"
              className="shrink-0 font-display text-2xl font-bold tracking-[-0.02em] text-white no-underline"
            >
              ROAD
            </a>
            <ul className="hidden items-center gap-10 list-none m-0 p-0 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/60 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>
              <button
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3b5bff] text-[9px] font-bold text-white">
                  3
                </span>
              </button>
              <button
                aria-label="Menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3b5bff] to-[#2a44e6] text-white transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(77,110,255,0.6)]"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={18} strokeWidth={2} />
              </button>
            </div>
          </nav>
        </header>

        <div
          className={`fixed inset-0 z-[60] transition-all duration-500 ${
            menuOpen
              ? "opacity-100 visible"
              : "pointer-events-none opacity-0 invisible"
          }`}
        >
          <div
            className="absolute inset-0 bg-[rgba(5,7,15,0.8)] backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className={`absolute right-0 top-0 h-full w-full max-w-[448px] bg-[#0d1233] p-8 transition-transform duration-500 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-12 flex items-center justify-between">
              <span className="font-display text-2xl font-bold text-white">
                ROAD
              </span>
              <button
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <ul className="m-0 list-none p-0">
              {NAV_LINKS.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-4 border-b border-white/5 py-4 text-white/80 no-underline transition-all hover:translate-x-2 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="font-sans text-[12px] text-[#7d92ff]/60">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[30px] font-medium text-white">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
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
        </div>
      </>
    );
  },
);

SiteHeader.displayName = "SiteHeader";

export default SiteHeader;
