import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useData } from "@/context/data";
import { useModal } from "@/context/modal";
import type { ProductInfoProps } from "@/types";

const COLOR_HEX: Record<string, string> = {
  Black: "#0b0b10",
  Charcoal: "#36393f",
  Olive: "#4b5320",
  Silver: "#c0c0c0",
  Sand: "#d8c39a",
  Navy: "#1b2a4a",
};

export const ProductInfo = ({ details, addCart }: ProductInfoProps) => {
  const { user } = useAuth();
  const { cartItems } = useData();
  const [selectedColor, setSelectedColor] = useState(details.color[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(details.size[0] ?? "");
  const { openAuth } = useModal();
  const [buyStatus, setBuyStatus] = useState("");
  const isInCart = cartItems.some((item) => item.id === details.id);

  const activeColor = selectedColor;
  const addSelectedItem = () => {
    if (!selectedSize || !activeColor) return;
    addCart(details, selectedSize, activeColor);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !activeColor) return;
    if (!user) {
      openAuth(addSelectedItem);
      return;
    }
    addSelectedItem();
  };

  const handleBuyNow = () => {
    if (!selectedSize || !activeColor) return;
    if (!user) {
      openAuth(() => {
        addSelectedItem();
        setBuyStatus("Added to cart");
      });
      return;
    }
    addSelectedItem();
    setBuyStatus("Added to cart");
  };

  return (
    <article className="flex-1 w-full md:max-w-[clamp(20rem,40vw,32rem)] mt-5 md:mt-0 flex flex-col gap-5">
      {details.isNew && (
        <p className="text-xs font-sans tracking-ultra uppercase text-(--cyan)">
          New Arrival
        </p>
      )}

      <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-(--ink)">
        {details.name}
      </h2>

      <p className="text-2xl font-sans text-(--primary-light)">
        ${details.price.toFixed(2)}
      </p>

      <p className="text-sm font-sans leading-relaxed text-(--ink-dim)">
        {details.description}
      </p>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-sans tracking-ultra uppercase text-(--ink-dim)">
          Color: {activeColor}
        </p>
        <div className="flex gap-3">
          {details.color.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              aria-label={color}
              className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                activeColor === color
                  ? "border-(--primary-light) shadow-[0_0_20px_-4px_var(--blue-glow)]"
                  : "border-(--border) hover:border-(--primary-light)/60"
              }`}
            >
              <span
                className="h-5 w-5 rounded-full"
                style={{
                  backgroundColor: COLOR_HEX[color] ?? "var(--border)",
                }}
              />
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-xs font-sans tracking-ultra uppercase text-(--ink-dim)">
          Size: {selectedSize}
        </p>
        <div className="flex flex-wrap gap-2">
          {details.size.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={`h-10 min-w-10 px-3 rounded-lg border font-sans text-sm transition-all duration-300 cursor-pointer ${
                selectedSize === size
                  ? "border-(--primary-light) text-(--ink) shadow-[0_0_20px_-4px_var(--blue-glow)]"
                  : "border-(--border) text-(--ink-dim) hover:border-(--primary-light)/60"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] ${
          isInCart
            ? "border border-emerald-600/60 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/20"
            : "bg-(image:--pill-grad) text-white"
        }`}
      >
        {isInCart ? "In Cart" : "Add to Cart"}
        <ShoppingBag size={18} />
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        className="flex items-center justify-center gap-2 rounded-xl border border-(--border) py-3.5 font-display text-sm uppercase tracking-wide text-(--ink) transition-colors duration-300 hover:border-(--primary-light) cursor-pointer"
      >
        Buy Now
      </button>
      {buyStatus && (
        <p role="status" className="text-sm text-emerald-500">
          {buyStatus}
        </p>
      )}
    </article>
  );
};
