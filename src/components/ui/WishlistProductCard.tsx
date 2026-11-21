import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import type { WishlistProductCardProps } from "@/types";

export const WishlistProductCard = ({
  product,
  isInCart,
  onRemove,
  onAddToCart,
}: WishlistProductCardProps) => (
  <article className="group overflow-hidden rounded-2xl border border-(--border)/40 bg-(--bg-panel-alt)/60 backdrop-blur-sm transition-all duration-300 hover:border-(--primary-light)/60 hover:shadow-[0_0_45px_-12px_var(--blue-glow)]">
    <div className="relative aspect-square overflow-hidden bg-ink-900/35">
      <Link
        to={`/product/${product.id}/${product.name}`}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 cursor-pointer"
      >
        <img
          src={product.src}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <button
        type="button"
        aria-label={`Remove ${product.name} from wishlist`}
        onClick={onRemove}
        className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full border border-red-400/40 bg-ink-900/80 text-red-400 backdrop-blur transition-colors hover:border-red-400 hover:bg-red-500/15"
      >
        <Heart size={17} fill="currentColor" />
      </button>
    </div>

    <div className="p-4">
      <p className="text-[10px] uppercase tracking-ultra text-electric-300">
        {product.category}
      </p>
      <Link
        to={`/product/${product.id}/${product.name}`}
        className="mt-1 block cursor-pointer truncate font-display text-sm uppercase tracking-wide text-white transition-colors hover:text-electric-300"
      >
        {product.name}
      </Link>
      <p className="mt-2 text-sm text-(--ink-dim)">
        ${product.price.toFixed(2)}
      </p>

      <button
        type="button"
        disabled={isInCart}
        onClick={onAddToCart}
        className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border py-2.5 text-[10px] uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed ${
          isInCart
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-electric-400/50 text-electric-300 hover:bg-electric-500/15"
        }`}
      >
        <ShoppingBag size={14} />
        {isInCart ? "In Cart" : "Add to Bag"}
      </button>
    </div>
  </article>
);
