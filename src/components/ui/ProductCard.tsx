import { ArrowUpRight, Heart, Plus } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useData } from "@/context/data";
import { useModal } from "@/context/modal";
import type { AllProducts, ProductCardProps } from "@/types";

export const ProductCard = ({
  id,
  isNew,
  src,
  alt,
  name,
  price,
  href,
  variant = "product",
}: ProductCardProps) => {
  const { user } = useAuth();
  const { data, cartItems, addCart, wishlistIds, toggleWishlist } = useData();
  const { openAuth } = useModal();
  const product = data?.find((item) => item.id === id);
  const isWishlisted = wishlistIds.includes(id);
  const isInCart = cartItems.some((item) => item.id === id);

  const detailsHref =
    variant === "category" && href ? href : `/product/${id}/${name}`;

  const addProduct = (product: AllProducts) => {
    const size = product.size[0];
    const color = product.color[0];
    if (size && color) addCart(product, size, color);
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!product) return;
    if (!user) {
      openAuth(() => addProduct(product));
      return;
    }
    addProduct(product);
  };

  const handleToggleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!user) {
      openAuth(() => toggleWishlist(id));
      return;
    }
    toggleWishlist(id);
  };

  return (
    <>
      <article className="group relative w-full aspect-3/4 overflow-hidden rounded-2xl border border-(--border)/40 bg-(--bg-panel-alt)/60 backdrop-blur-sm transition-all duration-300 hover:border-(--primary-light)/60 hover:shadow-[0_0_45px_-12px_var(--blue-glow)]">
        <Link
          to={detailsHref}
          aria-label={`View ${name}`}
          className="absolute inset-0 z-0 cursor-pointer rounded-2xl"
        />
        {isNew && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center justify-center rounded-full bg-(image:--pill-grad) px-3 py-1 shadow-[0_0_20px_-4px_var(--violet)]">
            <p className="mt-[0.5px] ml-0.5 text-[10px] tracking-ultra font-sans text-white">
              NEW
            </p>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className="pointer-events-none absolute top-[50%] z-0 h-[85%] w-full translate-y-[-50%] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate font-display text-sm uppercase tracking-wide text-(--ink)">
              {name}
            </h2>
            {variant === "product" && (
              <p className="mt-1 text-sm font-sans text-(--ink-dim)">{`${price} $`}</p>
            )}
          </div>
          {variant === "category" ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-electric-500 group-hover:text-white group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          ) : (
            <div className="pointer-events-auto flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={`${isWishlisted ? "Remove" : "Add"} ${name} ${
                  isWishlisted ? "from" : "to"
                } wishlist`}
                aria-pressed={isWishlisted}
                onClick={handleToggleWishlist}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${
                  isWishlisted
                    ? "border-red-500/60 bg-red-500/10 text-red-500 hover:border-red-500 hover:bg-red-500/20"
                    : "border-(--primary-light)/50 text-(--cyan) hover:border-primary hover:bg-primary hover:text-white"
                }`}
              >
                <Heart
                  size={18}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
              <button
                type="button"
                aria-label={
                  isInCart
                    ? `Add another ${name} to cart`
                    : `Add ${name} to cart`
                }
                onClick={handleAddToCart}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${
                  isInCart
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-500 hover:border-emerald-600 hover:bg-emerald-600/20"
                    : "border-(--primary-light)/50 text-(--cyan) hover:border-primary hover:bg-primary hover:text-white"
                }`}
              >
                <Plus />
              </button>
            </div>
          )}
        </div>
      </article>
    </>
  );
};
