import type { AllProducts, Product } from "@/types";
import { CATEGORY_GROUPS } from "./categoryGroups";

export const getCategoryCards = (products: AllProducts[]): Product[] => {
  return CATEGORY_GROUPS.map((group, index) => {
    const representative = products.find((p) =>
      group.categories.includes(p.category),
    );

    return {
      id: index,
      label: group.label,
      href: `/category/${group.slug}`,
      imageSrc: representative?.src ?? "",
    };
  });
};
