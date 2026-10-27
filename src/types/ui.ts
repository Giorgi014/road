import type { InputHTMLAttributes, ReactNode } from "react";
import type { AllProducts, OptionsType } from "./products";

export interface AuthBtnProps {
  children: ReactNode;
  variant: "login" | "registration";
  onClick?: () => void;
}

export interface ButtonProps {
  href: string;
  label: string;
}

export interface EyebrowProps {
  text: string;
  center?: boolean;
}

export type InputVariant = "name" | "lastname" | "email" | "password";

export interface InputConfig {
  label: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
  name: string;
}

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & { variant: InputVariant };

export type ProductCardVariant = "product" | "category";

export interface ProductCardProps {
  id: number;
  isNew?: boolean;
  src: string;
  alt: string;
  name: string;
  price?: number;
  href?: string;
  variant?: ProductCardVariant;
}

export interface SearchProps {
  onClose: () => void;
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

export interface CategoriesProps {
  selected: string[];
  onToggle: (category: string) => void;
}

export interface SortingProps {
  value: OptionsType;
  onChange: (option: OptionsType) => void;
}

export interface PriceRangeProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  onChange?: (range: [number, number]) => void;
}
