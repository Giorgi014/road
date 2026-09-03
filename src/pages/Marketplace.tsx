import { ProductCard } from "@/components/ui/ProductCard";
import { Categories } from "@/components/products/Categories";
import { PriceRange } from "@/components/products/PriceRange";
import { Size } from "@/components/products/Size";
import { Sorting } from "@/components/products/Sorting";
import { useMemo, useState } from "react";
import { OPTIONS } from "@/data/content";
import type { OptionsType } from "@/types";
import { useData } from "@/context/data/use-data";
import { SlidersHorizontal, X } from "lucide-react";

const PRICE_MIN = 50;
const PRICE_MAX = 1000;

function Marketplace() {
  const [sort, setSort] = useState<OptionsType>(OPTIONS[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data } = useData();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    500,
  ]);

  const toggleCategory = (category: string) => {
    if (category === "all") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const sortedProducts = useMemo(() => {
    let products = data ? [...data] : [];

    products = products.filter(
      (prod) => prod.price >= priceRange[0] && prod.price <= priceRange[1],
    );

    if (selectedCategories.length > 0) {
      products = products.filter((prod) =>
        selectedCategories.includes(`${prod.category.toLocaleLowerCase()}s`),
      );
    }

    switch (sort.value) {
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "name-asc":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, [sort, selectedCategories, priceRange, data]);

  return (
    <article className="flex justify-between items-start gap-5 p-5 mt-19">
      <button
        type="button"
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden fixed bottom-5 left-5 z-40 flex items-center gap-1.5 rounded-xl border border-(--border) bg-(--surface) px-4 py-2.5 text-sm font-sans uppercase text-(--ink-dim) shadow-lg"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      <aside
        className={`group relative h-max w-75 px-4 py-5 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 backdrop-blur-sm transition-all duration-300
          max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:z-50 max-md:w-full max-md:h-auto max-md:max-h-[85vh] max-md:overflow-y-auto max-md:rounded-b-none max-md:rounded-t-2xl
          ${isFilterOpen ? "max-md:block" : "max-md:hidden"}`}
      >
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setIsFilterOpen(false)}
          className="md:hidden absolute top-4 right-4 text-(--ink-dim) hover:text-(--ink)"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="truncate font-display text-sm uppercase tracking-wide text-(--ink) mb-5">
          Categories
        </h3>
        <Categories selected={selectedCategories} onToggle={toggleCategory} />
        <PriceRange
          min={PRICE_MIN}
          max={PRICE_MAX}
          defaultMin={priceRange[0]}
          defaultMax={priceRange[1]}
          onChange={setPriceRange}
        />
        <Size />
      </aside>

      {isFilterOpen && (
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setIsFilterOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      <section className="w-full">
        <div className="flex justify-between items-start w-full">
          <div>
            <p className="uppercase text-sm font-sans text-(--ink-dim)">
              marketplace
            </p>
            <h2 className="uppercase mt-2.5 mb-2.5 font-display text-[clamp(18px,3vw,36px)] tracking-wide text-(--ink)">
              explore the collections
            </h2>
          </div>
          <Sorting value={sort} onChange={setSort} />
        </div>
        <div className="grid grid-cols-1 gap-5 place-items-center sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              isNew={item.isNew}
              src={item.src}
              alt={item.name}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </section>
    </article>
  );
}

export default Marketplace;
