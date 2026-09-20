export interface CategoryGroup {
  label: string;
  slug: string;
  categories: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { label: "Jackets", slug: "jackets", categories: ["Jacket"] },
  { label: "Backpacks", slug: "backpacks", categories: ["Backpack"] },
  { label: "Boots", slug: "boots", categories: ["Boot"] },
  {
    label: "Accessories",
    slug: "accessories",
    categories: [
      "Pant",
      "Cap",
      "Helmet",
      "Mask",
      "Goggles",
      "Bag",
      "Vest",
      "Glove",
    ],
  },
];
