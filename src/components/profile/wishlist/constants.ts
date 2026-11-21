import type { AllProducts } from "@/types";

export type WishlistCategory = "all" | "apparel" | "accessories" | "gear";

export const CATEGORY_FILTERS: {
  label: string;
  value: WishlistCategory;
}[] = [
  { label: "All", value: "all" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
  { label: "Gear", value: "gear" },
];

const APPAREL_CATEGORIES = new Set(["jacket", "pant", "vest", "hoodie"]);
const ACCESSORY_CATEGORIES = new Set([
  "cap",
  "goggles",
  "glove",
  "necklace",
  "smartwatch",
  "sunglasses",
]);

export const getWishlistCategory = (
  product: AllProducts,
): Exclude<WishlistCategory, "all"> => {
  const category = product.category.toLocaleLowerCase();
  if (APPAREL_CATEGORIES.has(category)) return "apparel";
  if (ACCESSORY_CATEGORIES.has(category)) return "accessories";
  return "gear";
};
