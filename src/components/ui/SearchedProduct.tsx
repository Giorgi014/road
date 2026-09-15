import type { SearchedProductProps } from "@/types";

export const SearchedProduct = ({
  isNew,
  src,
  alt,
  name,
  price,
  onClick,
}: SearchedProductProps) => {
  return (
    <div
      className="relative flex items-center gap-4 px-5 py-3 cursor-pointer transition-colors hover:bg-white/5 border-b border-ink-400/20 last:border-none"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="h-14 w-14 shrink-0 rounded-lg object-contain bg-ink-900/40"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-sm uppercase tracking-wide text-(--ink)">
          {name}
        </h3>
        <p className="mt-1 text-sm font-sans text-(--ink-dim)">{`${price} $`}</p>
      </div>
      {isNew && (
        <div className="flex justify-center items-center absolute top-4 right-4 z-10 rounded-full bg-linear-to-r from-electric-500 to-electric-600 px-3 py-1 shadow-[0_0_20px_-4px_var(--violet)]">
          <p className="mt-[0.5px] ml-0.5 text-[10px] tracking-ultra font-sans text-white">
            NEW
          </p>
        </div>
      )}
    </div>
  );
};
