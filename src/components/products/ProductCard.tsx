import { ArrowUpRight } from "lucide-react";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <a
      href={product.href}
      className="product-card group relative aspect-[3/4] overflow-hidden border border-ink-400 bg-ink-700 text-inherit no-underline transition-colors duration-500 hover:border-electric-500"
    >
      <img
        src={product.imageSrc}
        alt={product.label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-800/40 to-transparent shadow-[inset_0_0_80px_var(--shadow-soft)] transition-shadow duration-500 group-hover:shadow-[0_0_40px_-10px_var(--blue-glow)]" />
      <div className="absolute inset-0 bg-transparent transition-colors duration-500 group-hover:bg-electric-500/5" />
      <span className="font-sans absolute left-4 top-4 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            {product.label}
          </h3>
          <p className="mt-1 text-[12px] text-white/40">Explore line</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-electric-500 group-hover:text-white group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </a>
  );
}
