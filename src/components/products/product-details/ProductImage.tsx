import type { ProductImageProps } from "@/types";

export const ProductImage = ({
  src,
  alt,
  isSelected,
  onSelect,
}: ProductImageProps) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative shrink-0 lg:h-[clamp(6rem,8vw,10rem)] h-[clamp(5rem,20vw,7rem)] lg:w-[clamp(6rem,8vw,10rem)] w-[clamp(5rem,20vw,7rem)] overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
        isSelected
          ? "bborder-(--primary-light) shadow-[0_0_45px_-12px_var(--blue-glow)]"
          : "border-[var(--border)]/40 bg-[var(--bg-panel-alt)]/60 hover:border-[var(--primary-light)]/60 hover:shadow-[0_0_45px_-12px_var(--blue-glow)]"
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute top-[50%] translate-y-[-50%] z-0 h-[85%] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
};
