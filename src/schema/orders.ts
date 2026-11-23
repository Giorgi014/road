import { z } from "zod";

const orderItemSchema = z.object({
  id: z.number(),
  category: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  size: z.array(z.string()),
  color: z.array(z.string()),
  src: z.string(),
  images: z.array(z.string()),
  isNew: z.boolean().optional(),
  quantity: z.number().int().positive(),
  selectedSize: z.string(),
  selectedColor: z.string(),
});

export const savedOrderSchema = z.object({
  id: z.string(),
  customerEmail: z.string().email(),
  createdAt: z.string().datetime(),
  status: z.enum(["Processing", "Shipped", "Delivered", "Cancelled"]),
  total: z.number().nonnegative(),
  items: z.array(orderItemSchema).min(1),
});

export const savedOrderListSchema = z.array(savedOrderSchema);
