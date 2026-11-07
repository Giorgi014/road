import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/context/data/use-data";

const WISHLIST_IDS = [0, 11, 17];

export const WishlistSection = () => {
  const { data } = useData();
  const wishlistProducts = WISHLIST_IDS.flatMap(
    (id) => data?.find((product) => product.id === id) ?? [],
  );

  return (
    <section className="relative flex h-full min-h-95 w-full flex-col gap-5 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="flex w-full items-center justify-between">
        <ol className="list-disc pl-5 uppercase marker:text-electric-300">
          <li className="text-xs tracking-ultra">Wishlist</li>
        </ol>

        <Link
          to="/profile/wishlist"
          className="flex items-center gap-2 text-xs uppercase tracking-ultra text-electric-300 transition-colors hover:text-white"
        >
          View All
          <ArrowRight size={16} strokeWidth={1.6} />
        </Link>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[repeat(3,minmax(0,1fr))_minmax(82px,0.7fr)] items-stretch gap-3">
        {wishlistProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group min-w-0"
          >
            <div className="relative h-33 w-full overflow-hidden rounded-xl border border-white/6 bg-ink-900/35 sm:h-36 lg:h-37.5">
              <img
                src={product.src}
                alt={product.name}
                className="absolute top-1/2 z-0 h-[85%] w-full -translate-y-1/2 object-contain transition-transform duration-300 group-hover:scale-105"
                draggable={false}
                loading="lazy"
              />
            </div>
            <p className="mt-3 truncate text-sm font-semibold text-white/95">
              {product.name}
            </p>
            <p className="mt-1 text-lg text-gradient-blue">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}

        <Link
          to="/profile/wishlist"
          className="flex min-h-full flex-col items-center justify-center rounded-xl border border-electric-400/20 bg-[linear-gradient(180deg,rgba(49,85,255,.16),rgba(49,85,255,.03))] text-center text-electric-300 transition-colors hover:border-electric-300/50 hover:bg-electric-500/10"
        >
          <Heart
            size={30}
            strokeWidth={1.35}
            className="mb-3"
            fill="rgba(49,85,255,.12)"
          />
          <span className="font-display text-xl leading-none text-white">
            15+
          </span>
          <span className="mt-2 text-xs uppercase tracking-[0.12em] text-white/45">
            Items
          </span>
        </Link>
      </div>
    </section>
  );
};
