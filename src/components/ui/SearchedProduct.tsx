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
    <button
      type="button"
      onClick={onClick}
      className="relative flex w-full cursor-pointer items-center gap-4 border-b border-ink-400/20 px-5 py-3 text-left transition-colors hover:bg-white/5 last:border-none"
    >
      <img
        src={src}
        alt={alt}
        className="h-14 w-14 shrink-0 rounded-lg object-contain bg-ink-900/40"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-sm uppercase tracking-wide text-(--ink)">
          {name}
        </span>
        <span className="mt-1 block text-sm font-sans text-(--ink-dim)">
          {`${price} $`}
        </span>
      </span>
      {isNew && (
        <span className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full bg-linear-to-r from-electric-500 to-electric-600 px-3 py-1 shadow-[0_0_20px_-4px_var(--violet)]">
          <span className="mt-[0.5px] ml-0.5 font-sans text-[10px] tracking-ultra text-white">
            NEW
          </span>
        </span>
      )}
    </button>
  );
};
