import { ProductCard } from "@/components/ui/ProductCard";
import { All_PRODUCTS } from "../data/products";
import { Filter } from "@/components/products/Filter";
import { PriceRange } from "@/components/products/PriceRange";
import { Size } from "@/components/products/Size";

function Marketplace() {
  return (
    <article className="flex justify-between items-start gap-5 p-5 mt-19">
      <aside className="group relative h-max w-63 px-4 py-5 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 backdrop-blur-sm transition-all duration-300">
        <h3 className="truncate font-display text-sm uppercase tracking-wide text-(--ink) mb-5">
          Filter
        </h3>
        <Filter />
        <PriceRange />
        <Size />
      </aside>
      <section className="">
        <div className="flex justify-between items-start w-full">
          <div>
            <p className="uppercase text-sm font-sans text-(--ink-dim)">
              marketplace
            </p>
            <h2 className="uppercase mt-2.5 mb-2.5 font-display text-4xl tracking-wide text-(--ink">
              explore the collections
            </h2>
          </div>
          select
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {All_PRODUCTS.map((item) => (
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
