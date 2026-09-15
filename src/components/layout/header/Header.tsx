import { forwardRef, useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { MenuSidebar } from "./MenuSidebar";

interface SiteHeaderProps {
  variant?: "overlay" | "solid";
}

export const Header = forwardRef<HTMLElement, SiteHeaderProps>(
  ({ variant = "solid" }, ref) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      if (variant !== "solid") return;
      const onScroll = () => setScrolled(window.scrollY > 3200);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, [variant]);

    const headerClass = [
      "fixed inset-x-0 top-0 z-50 px-0 py-5 transition-all duration-500",
      variant === "overlay" ? "bg-transparent" : "border-b border-transparent",
      scrolled ? "bg-ink-800/80 py-3 backdrop-blur-xl border-ink-400" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <header ref={ref} className={headerClass}>
          <Navigation setMenuOpen={setMenuOpen} />
        </header>

        <section
          className={`fixed inset-0 z-60 transition-all duration-500 ${menuOpen ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}`}
        >
          <MenuSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </section>
      </>
    );
  },
);
