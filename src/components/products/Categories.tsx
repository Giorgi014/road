import { ALL_CATEGORIES } from "@/data/content";
import { All_PRODUCTS } from "@/data/products";
import { useMemo } from "react";

export const Categories = () => {
  const categoryCount = useMemo(() => {
    const count: Record<string, number> = { all: All_PRODUCTS.length };

    for (const prod of All_PRODUCTS) {
      const key = `${prod.category.toLocaleLowerCase()}s`;

      count[key] = (count[key] ?? 0) + 1;
    }
    return count;
  }, []);

  return (
    <article className="w-full">
      {ALL_CATEGORIES.map((item) => (
        <ul className="w-full mt-1 mb-1" key={item.id}>
          <section className="group flex justify-between items-center pt-1 pb-1 w-full text-(--ink-dim) hover:text-(--ink) duration-300 cursor-pointer">
            <div className="flex justify-start items-center gap-1.5">
              <input
                type="checkbox"
                name="choose"
                id="choose"
                className="p-1 cursor-pointer"
              />
              <li className="text-sm font-sans uppercase">{item.category}</li>
            </div>
            <p className="text-sm font-sans uppercase">
              {categoryCount[item.category] ?? 0}
            </p>
          </section>
        </ul>
      ))}
    </article>
  );
};
