export interface Product {
  id: number;
  label: string;
  imageSrc: string;
  href: string;
}

export interface AllProducts {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  size: string[];
  color: string[];
  src: string;
  images: string[];
  isNew?: boolean;
}

export interface ProductDataResponse {
  allProducts?: AllProducts[] | null;
}

export interface CategoryGroup {
  label: string;
  slug: string;
  categories: string[];
}

export interface AllCategories {
  id: number;
  category: string;
}

export interface Sizes {
  id: number;
  size: string;
}

export type SortValue =
  | "all"
  | "price-desc"
  | "price-asc"
  | "name-asc"
  | "name-desc";

export interface OptionsType {
  value: SortValue;
  label: string;
}
