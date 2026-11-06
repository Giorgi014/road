import { ArrowRight, Circle, CircleCheck } from "lucide-react";
import { useData } from "@/context/data/use-data";

type OrderStatus = "Delivered" | "Processing" | "Shipped";

type MockOrder = {
  productId: number;
  size?: string;
  qty: number;
  status: OrderStatus;
};

const MOCK_ORDERS: MockOrder[] = [
  { productId: 1, size: "M", qty: 1, status: "Delivered" },
  { productId: 13, size: "M", qty: 1, status: "Delivered" },
  { productId: 24, size: "M", qty: 1, status: "Processing" },
  { productId: 18, qty: 1, status: "Shipped" },
];

const STATUS_STYLES: Record<
  OrderStatus,
  { color: string; Icon: typeof Circle }
> = {
  Delivered: { color: "text-emerald-400", Icon: CircleCheck },
  Processing: { color: "text-electric-300", Icon: Circle },
  Shipped: { color: "text-sky-400", Icon: CircleCheck },
};

export const OrdersSection = () => {
  const { data } = useData();

  const orders = MOCK_ORDERS.flatMap((order) => {
    const product = data?.find((p) => p.id === order.productId);
    return product ? [{ ...order, product }] : [];
  });

  return (
    <section className="relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="flex w-full items-center justify-between">
        <ol className="list-disc pl-5 uppercase marker:text-electric-300">
          <li>Recent Orders</li>
        </ol>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-ultra text-electric-300 transition-colors hover:text-white"
        >
          View all
          <ArrowRight size={16} strokeWidth={1.6} />
        </button>
      </div>

      <ul className="flex w-full flex-col">
        {orders.map(({ product, size, qty, status }) => {
          const { color, Icon } = STATUS_STYLES[status];

          return (
            <li
              key={product.id}
              className="flex w-full items-center gap-4 border-b border-b-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-ink-400/40 bg-ink-800/60 backdrop-blur-sm sm:size-24">
                <img
                  src={product.src}
                  alt={product.name}
                  className="absolute top-1/2 z-0 h-[85%] w-full -translate-y-1/2 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 self-start">
                <p className="truncate font-semibold text-white">
                  {product.name}
                </p>
                <p className="text-sm text-white/50">
                  {size && <>Size: {size} &nbsp;•&nbsp; </>}
                  Qty: {qty}
                </p>
                <p className="text-white">${product.price.toFixed(2)}</p>
              </div>

              <div
                className={`flex items-center gap-2 self-end text-sm ${color}`}
              >
                <Icon size={18} strokeWidth={1.6} />
                {status}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
