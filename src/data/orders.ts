import {
  Circle,
  CircleCheck,
  CircleX,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { OrderStatus } from "@/types";

export const ORDER_STATUS_STYLES: Record<
  OrderStatus,
  { color: string; Icon: LucideIcon; label: string }
> = {
  Processing: {
    color: "text-electric-300",
    Icon: Circle,
    label: "Processing",
  },
  Shipped: { color: "text-sky-400", Icon: Truck, label: "Shipped" },
  Delivered: {
    color: "text-emerald-400",
    Icon: CircleCheck,
    label: "Delivered",
  },
  Cancelled: { color: "text-red-400", Icon: CircleX, label: "Cancelled" },
};

export const ORDER_STATUS_FILTERS = [
  "All",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;
