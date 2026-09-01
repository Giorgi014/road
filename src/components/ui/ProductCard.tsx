import type { ProductCardProps } from "@/types";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({
  id,
  isNew,
  src,
  alt,
  name,
  price,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const productDetails = () => {
    navigate(`/product/${id}/${name}`);
  };

  return (
    <div
      className="group relative lg:h-[clamp(13rem,24vw,31.25rem)] sm:h-[clamp(13rem,45vw,31.25rem)] h-[clamp(13rem,90vw,31.25rem)] lg:w-[clamp(8rem,17vw,22.125rem)] sm:w-[clamp(8rem,30vw,22.125rem)] w-[clamp(8rem,70vw,22.125rem)] overflow-hidden rounded-2xl border border-[var(--border)]/40 bg-[var(--bg-panel-alt)]/60 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary-light)]/60 hover:shadow-[0_0_45px_-12px_var(--blue-glow)] cursor-pointer"
      onClick={productDetails}
    >
      {isNew && (
        <div className="flex justify-center items-center absolute top-4 right-4 z-10 rounded-full bg-[image:var(--pill-grad)] px-3 py-1 shadow-[0_0_20px_-4px_rgba(104,71,255,0.9)]">
          <p className="mt-[0.5px] ml-0.5 text-[10px] tracking-ultra font-sans text-white">
            NEW
          </p>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="absolute top-[50%] translate-y-[-50%] z-0 h-[85%] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <h2 className="truncate font-display text-sm uppercase tracking-wide text-(--ink)">
            {name}
          </h2>
          <p className="mt-1 text-sm font-sans text-(--ink-dim)">{`${price} $`}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--primary-light)]/50 text-[var(--cyan)] transition-colors duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white">
          <Plus />
        </div>
      </div>
    </div>
  );
};
