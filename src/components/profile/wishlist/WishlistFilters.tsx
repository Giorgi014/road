import { Sorting } from "@/components/products";
import { OPTIONS } from "@/data";
import type { OptionsType } from "@/types";
import { CATEGORY_FILTERS, type WishlistCategory } from "./constants";

const WISHLIST_SORT_OPTIONS = OPTIONS.map((option) =>
  option.value === "all" ? { ...option, label: "Recently Added" } : option,
);

interface WishlistFiltersProps {
  category: WishlistCategory;
  categoryCounts: Record<WishlistCategory, number>;
  sort: OptionsType;
  onCategoryChange: (category: WishlistCategory) => void;
  onSortChange: (option: OptionsType) => void;
}

export const WishlistFilters = ({
  category,
  categoryCounts,
  sort,
  onCategoryChange,
  onSortChange,
}: WishlistFiltersProps) => (
  <div className="my-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex flex-wrap gap-2">
      {CATEGORY_FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          aria-pressed={category === filter.value}
          onClick={() => onCategoryChange(filter.value)}
          className={`cursor-pointer rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-wide transition-colors ${
            category === filter.value
              ? "border-electric-400/60 bg-electric-500/15 text-electric-300"
              : "border-ink-400/40 text-white/55 hover:border-electric-400/40 hover:text-white"
          }`}
        >
          {filter.label} ({categoryCounts[filter.value]})
        </button>
      ))}
    </div>

    <div className="flex shrink-0 items-center gap-3 text-[10px] uppercase tracking-wide text-white/50">
      Sort by
      <Sorting
        value={sort}
        onChange={onSortChange}
        options={WISHLIST_SORT_OPTIONS}
      />
    </div>
  </div>
);
