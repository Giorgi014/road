import type { CartItem } from "@/types";

export const getOrderPricing = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 250 ? 0 : 30;
  const tax = 11;

  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
};
