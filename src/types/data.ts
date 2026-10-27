import type { AllProducts } from "./products";

export type CartItem = AllProducts & { quantity: number };

export interface DataContextType {
  data: AllProducts[] | null;
  cartItems: CartItem[];
  addCart: (product: AllProducts) => void;
  removeCart: (id: number) => void;
}
