import { ProductCard } from "@/components/ui/ProductCard";
import { All_PRODUCTS } from "../data/products";
import { Categories } from "@/components/products/Categories";
import { PriceRange } from "@/components/products/PriceRange";
import { Size } from "@/components/products/Size";
import { Sorting } from "@/components/products/Sorting";
import { useMemo, useState } from "react";
import { OPTIONS } from "@/data/content";
import type { OptionsType } from "@/types";

function Marketplace() {
  const [sort, setSort] = useState<OptionsType>(OPTIONS[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
    let products = [...All_PRODUCTS];

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
  }, [sort, selectedCategories]);

  return (
    <article className="flex justify-between items-start gap-5 p-5 mt-19">
      <aside className="group relative h-max w-75 px-4 py-5 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 backdrop-blur-sm transition-all duration-300">
        <h3 className="truncate font-display text-sm uppercase tracking-wide text-(--ink) mb-5">
          Categories
        </h3>
        <Categories selected={selectedCategories} onToggle={toggleCategory} />
        <PriceRange />
        <Size />
      </aside>
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((item) => (
            <ProductCard
              key={item.id}
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
