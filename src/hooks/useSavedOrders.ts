import { useState } from "react";
import { getOrderPricing } from "@/lib/orderPricing";
import { savedOrderListSchema } from "@/schema/orders";
import type { CartItem, SavedOrder } from "@/types";

const STORAGE_KEY = "roadOrders";

const readOrders = (): SavedOrder[] => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const result = savedOrderListSchema.safeParse(JSON.parse(stored));
    if (result.success) return result.data;
    console.error("Saved orders in localStorage have an invalid format.");
  } catch (error) {
    console.error("Unable to load saved orders.", error);
  }
  return [];
};

export const useSavedOrders = () => {
  const [orders, setOrders] = useState<SavedOrder[]>(readOrders);
  const [storageError, setStorageError] = useState<string | null>(null);

  const persistOrders = (nextOrders: SavedOrder[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders));
      setOrders(nextOrders);
      setStorageError(null);
      return true;
    } catch (error) {
      console.error("Unable to update saved orders.", error);
      setStorageError("Order changes could not be saved in this browser.");
      return false;
    }
  };

  const addOrder = ({
    id,
    customerEmail,
    items,
  }: {
    id: string;
    customerEmail: string;
    items: CartItem[];
  }) => {
    const { total } = getOrderPricing(items);
    const newOrder: SavedOrder = {
      id,
      customerEmail,
      createdAt: new Date().toISOString(),
      status: "Processing",
      total,
      items: items.map((item) => ({ ...item })),
    };
    return persistOrders([newOrder, ...orders]);
  };

  const cancelOrder = (id: string) => {
    const order = orders.find((item) => item.id === id);
    if (!order || order.status !== "Processing") return false;
    return persistOrders(
      orders.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item,
      ),
    );
  };

  const deleteOrder = (id: string) => {
    if (!orders.some((item) => item.id === id)) return false;
    return persistOrders(orders.filter((item) => item.id !== id));
  };

  return { orders, storageError, addOrder, cancelOrder, deleteOrder };
};
