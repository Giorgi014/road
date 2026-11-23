import type { SavedOrder } from "@/types";
import { OrderCard } from "./OrderCard";

export const OrdersList = ({
  orders,
  emptyMessage,
  onCancel,
  onDelete,
}: {
  orders: SavedOrder[];
  emptyMessage: string;
  onCancel?: (id: string) => boolean;
  onDelete?: (id: string) => boolean;
}) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink-400/40 px-5 py-12 text-center">
        <p className="text-sm text-white/55">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderCard order={order} onCancel={onCancel} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};
