import type { CartItem } from "./data";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type SavedOrder = {
  id: string;
  customerEmail: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  items: CartItem[];
};
