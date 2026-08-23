import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Product {
  id: number;
  label: string;
  imageSrc: string;
  href: string;
}

export interface ProductCardProps {
  isNew?: boolean;
  src: string;
  alt: string;
  name: string;
  price: number;
}

export type AllProducts = {
  id: number;
  product_type: string;
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
