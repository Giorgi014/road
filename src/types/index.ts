import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface SidebarLink {
  label: string;
  href: string;
  action?: "auth";
}

export interface Product {
  id: number;
  label: string;
  imageSrc: string;
  href: string;
}

export interface ProductCardProps {
  id: number;
  isNew?: boolean;
  src: string;
  alt: string;
  name: string;
  price: number;
}

export interface SearchedProductProps {
  isNew?: boolean;
  src: string;
  alt: string;
  name: string;
  price: number;
  onClick: () => void;
}

export interface ProductImageProps {
  id: number;
  src: string;
  alt: string;
  isSelected: boolean;
  onSelect: () => void;
}

export interface ProductInfoProps {
  details: AllProducts;
  addCart: (product: AllProducts) => void;
}

export type AllProducts = {
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
};

export interface FeatureItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export type AllCategories = {
  id: number;
  category: string;
};

export type Sizes = {
  id: number;
  size: string;
};

export type CategoriesProps = {
  selected: string[];
  onToggle: (category: string) => void;
};

export type OptionsType = {
  value: string;
  label: string;
};

export type SortingProps = {
  value: OptionsType;
  onChange: (option: OptionsType) => void;
};

export interface PriceRangeProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  onChange?: (range: [number, number]) => void;
}
