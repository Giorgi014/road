import { Ban, Trash2 } from "lucide-react";
import { ORDER_STATUS_STYLES } from "@/data";
import type { SavedOrder } from "@/types";

type OrderCardProps = {
  order: SavedOrder;
  onCancel?: (id: string) => boolean;
  onDelete?: (id: string) => boolean;
};

export const OrderCard = ({ order, onCancel, onDelete }: OrderCardProps) => {
  const { color, Icon, label } = ORDER_STATUS_STYLES[order.status];
  const itemCount = order.items.reduce(
    (count, item) => count + item.quantity,
    0,
  );
  const visibleItems = order.items.slice(0, 3);

  const handleCancel = () => {
    if (
      order.status === "Processing" &&
      window.confirm(`Cancel order ${order.id}? This cannot be undone.`)
    ) {
      onCancel?.(order.id);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete order ${order.id} from your order history? This cannot be undone.`,
      )
    ) {
      onDelete?.(order.id);
    }
  };

  return (
    <article className="grid gap-4 rounded-xl border border-ink-400/30 bg-ink-900/35 p-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(130px,.8fr)] sm:items-center sm:p-4">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex min-w-0 items-center -space-x-2">
          {visibleItems.map((item, index) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-ink-400/50 bg-ink-800 sm:size-16"
              style={{ zIndex: visibleItems.length - index }}
            >
              <img
                src={item.src}
                alt={item.name}
                loading="lazy"
                className="size-full object-contain p-1"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-400/50 bg-ink-800 text-[10px] text-primary-light">
              +{order.items.length - 3}
            </span>
          )}
        </div>
        <div className="min-w-0 pl-1">
          <p className="truncate text-[10px] text-white/55">
            {order.items.map((item) => item.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="min-w-0 border-t border-ink-400/25 pt-3 sm:border-l sm:border-t-0 sm:py-1 sm:pl-4">
        <p className="truncate font-display text-[11px] uppercase text-white">
          Order #{order.id}
        </p>
        <p className="mt-1 text-[10px] text-white/45">
          {new Date(order.createdAt).toLocaleDateString()} &nbsp;·&nbsp;{" "}
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
        <p className="mt-1 text-xs text-white/75">${order.total.toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-between border-t border-ink-400/25 pt-3 sm:border-l sm:border-t-0 sm:py-1 sm:pl-4">
        <span
          className={`flex items-center gap-2 text-[10px] uppercase ${color}`}
        >
          <Icon size={15} strokeWidth={1.7} />
          {label}
        </span>
        <span className="text-[9px] text-white/35">
          {order.status === "Processing" ? "Payment received" : "Order update"}
        </span>
      </div>
      {(onCancel || onDelete) && (
        <div className="flex justify-end gap-2 border-t border-ink-400/25 pt-3 sm:col-span-3">
          {onCancel && order.status === "Processing" && (
            <button
              type="button"
              onClick={handleCancel}
              aria-label={`Cancel order ${order.id}`}
              className="flex items-center gap-1.5 rounded-lg border border-amber-400/25 px-3 py-2 text-[9px] uppercase text-amber-300 transition-colors hover:border-amber-300/60 hover:bg-amber-400/5 cursor-pointer"
            >
              <Ban size={13} />
              Cancel order
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              aria-label={`Delete order ${order.id}`}
              className="flex items-center gap-1.5 rounded-lg border border-red-600/25 px-3 py-2 text-[9px] uppercase text-red-500 transition-colors hover:border-red-500/60 hover:bg-red-400/5 cursor-pointer"
            >
              <Trash2 size={13} />
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  );
};
