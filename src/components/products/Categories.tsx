import { ALL_CATEGORIES } from "@/data/content";
import { All_PRODUCTS } from "@/data/products";
import type { CategoriesProps } from "@/types";
import { Check } from "lucide-react";
import { useMemo } from "react";

export const Categories = ({ selected, onToggle }: CategoriesProps) => {
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
      {ALL_CATEGORIES.map((item) => {
        const isChecked =
          item.category === "all"
            ? selected.length === 0
            : selected.includes(item.category);

        return (
          <ul className="w-full mt-1 mb-1" key={item.id}>
            <section className="group flex justify-between items-center pt-1 pb-1 w-full text-(--ink-dim) hover:text-(--ink) duration-300 cursor-pointer">
              <div className="flex justify-start items-center gap-1.5">
                <label className="relative flex items-center justify-center shrink-0 cursor-pointer">
                  <input
                    type="checkbox"
                    name="choose"
                    id={`choose-${item.id}`}
                    checked={isChecked}
                    onChange={() => onToggle(item.category)}
                    className="peer appearance-none w-4 h-4 rounded-[3px] border border-(--border) bg-(--surface) checked:bg-(--primary) checked:border-(--primary) checked:shadow-[0_0_10px_var(--blue-glow)] transition-all duration-200 cursor-pointer"
                  />
                  <Check className="pointer-events-none absolute w-2.5 h-2.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-150" />
                </label>
                <li className="text-sm font-sans uppercase">{item.category}</li>
              </div>
              <p className="text-sm font-sans uppercase">
                {categoryCount[item.category] ?? 0}
              </p>
            </section>
          </ul>
        );
      })}
    </article>
  );
};
