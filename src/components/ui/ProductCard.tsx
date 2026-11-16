import { ArrowUpRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type MouseEvent, useState } from "react";
import { AuthModal } from "@/components/authorization";
import { useAuth } from "@/context/auth";
import { useData } from "@/context/data";
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, addCart } = useData();
  const [authOpen, setAuthOpen] = useState(false);
  const product = data?.find((item) => item.id === id);

  const productDetails = () => {
    if (variant === "category" && href) {
      navigate(href);
      return;
    }
    navigate(`/product/${id}/${name}`);
  };

  const addProduct = (product: AllProducts) => {
    const size = product.size[0];
    const color = product.color[0];
    if (size && color) addCart(product, size, color);
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!product) return;
    if (!user) {
      setAuthOpen(true);
      return;
    }
    addProduct(product);
  };

  return (
    <>
      <article className="group relative w-full aspect-3/4 overflow-hidden rounded-2xl border border-(--border)/40 bg-(--bg-panel-alt)/60 backdrop-blur-sm transition-all duration-300 hover:border-(--primary-light)/60 hover:shadow-[0_0_45px_-12px_var(--blue-glow)]">
        <button
          type="button"
          aria-label={`View ${name}`}
          className="absolute inset-0 z-0 cursor-pointer rounded-2xl bg-transparent"
          onClick={productDetails}
        />
        {isNew && (
          <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center justify-center rounded-full bg-(image:--pill-grad) px-3 py-1 shadow-[0_0_20px_-4px_var(--violet)]">
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
            <button
              type="button"
              aria-label={`Add ${name} to cart`}
              onClick={handleAddToCart}
              className="pointer-events-auto flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--primary-light)/50 text-(--cyan) transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <Plus />
            </button>
          )}
        </div>
      </article>
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={() => {
            if (product) addProduct(product);
          }}
        />
      )}
    </>
  );
};
