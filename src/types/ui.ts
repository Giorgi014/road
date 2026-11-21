import type { InputHTMLAttributes, ReactNode } from "react";
import type { AllProducts, OptionsType } from "./products";

export interface AuthBtnProps {
  children: ReactNode;
  variant: "login" | "registration";
  onClick?: () => void;
}

export type ButtonProps = {
  label: string;
  className?: string;
} & (
  | { href: string; variant?: "link" }
  | {
      onClick: () => void;
      variant: "action";
      disabled?: boolean;
      icon?: ReactNode;
    }
);

export interface EyebrowProps {
  text: string;
  center?: boolean;
  delay?: number;
}

export type InputVariant = "name" | "lastname" | "email" | "password";

export interface InputConfig {
  label: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
  name: string;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant: InputVariant;
  label?: string;
  containerClassName?: string;
  fieldClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
};

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

export interface WishlistProductCardProps {
  product: AllProducts;
  isInCart: boolean;
  onRemove: () => void;
  onAddToCart: () => void;
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
  addCart: (
    product: AllProducts,
    selectedSize: string,
    selectedColor: string,
  ) => void;
}

export interface SizeFilterProps {
  selected: string[];
  onToggle: (size: string) => void;
}

export interface CategoriesProps {
  selected: string[];
  onToggle: (category: string) => void;
}

export interface SortingProps {
  value: OptionsType;
  onChange: (option: OptionsType) => void;
  options?: OptionsType[];
}

export interface PriceRangeProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  onChange?: (range: [number, number]) => void;
}
