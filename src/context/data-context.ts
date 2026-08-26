import { createContext } from "react";
import type { AllProducts } from "@/types";

export type CartItem = AllProducts & { quantity: number };

export type DataContextType = {
  data: AllProducts[] | null;
  cartItems: CartItem[];
  addCart: (product: AllProducts) => void;
  removeCart: (id: number) => void;
};

export const DataContext = createContext<DataContextType | null>(null);
