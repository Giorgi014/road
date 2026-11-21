import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/data";
import type { SearchProps } from "@/types";
import { SearchedProduct } from "./SearchedProduct";

export const SearchValue = ({ onClose }: SearchProps) => {
  const { data } = useData();
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("button, input, a[href]"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previous?.focus();
    };
  }, [onClose]);

  const filteredProducts = useMemo(() => {
    const query = searchProduct.trim().toLowerCase();
    if (!query || !data) return [];

    return data.filter((product) => product.name.toLowerCase().includes(query));
  }, [data, searchProduct]);

  const goToProduct = (id: number, name: string) => {
    navigate(`/product/${id}/${name}`);
    onClose();
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-99999 flex items-start justify-center bg-ink-900/85 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="w-[90%] max-w-170 mt-20 lg:mt-10 flex flex-col gap-3"
      >
        <div className="relative flex items-center rounded-full border border-ink-400 bg-ink-800/70 backdrop-blur-xl transition-colors focus-within:border-electric-400">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border-none bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/30"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <Search className="absolute right-5 cursor-pointer" />
        </div>

        {filteredProducts.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-ink-400/40 bg-ink-800/70 backdrop-blur-xl">
            {filteredProducts.map((product) => (
              <SearchedProduct
                key={product.id}
                isNew={product.isNew}
                {...product}
                alt={product.name}
                onClick={() => goToProduct(product.id, product.name)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 z-9999999 cursor-pointer"
        onClick={onClose}
      >
        <X size={18} />
      </button>
    </div>
  );
};
