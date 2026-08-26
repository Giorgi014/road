import { useEffect, useState, type ReactNode } from "react";
import type { AllProducts } from "@/types";
import { DataContext, type CartItem } from "./data-context";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AllProducts[] | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCard = localStorage.getItem("cartItems");
    return storedCard ? JSON.parse(storedCard) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const dataResponse = await res.json();
        setData(dataResponse.allProducts ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCart = (product: AllProducts) => {
    setCartItems((item) => {
      const existing = item.find((i) => i.id === product.id);
      if (existing) {
        return item;
      }
      return [...item, { ...product, quantity: 1 }];
    });
  };

  const removeCart = (id: number) => {
    setCartItems((item) => item.filter((i) => i.id !== id));
  };

  return (
    <DataContext.Provider value={{ data, cartItems, addCart, removeCart }}>
      {children}
    </DataContext.Provider>
  );
};
