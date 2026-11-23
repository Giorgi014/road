import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OrdersList } from "@/components/profile/orders";
import { useAuth } from "@/context/auth";
import { useSavedOrders } from "@/hooks";

export const OrdersSection = () => {
  const { user } = useAuth();
  const { orders, storageError, cancelOrder, deleteOrder } = useSavedOrders();
  const recentOrders = orders
    .filter(
      (order) =>
        order.customerEmail.toLowerCase() === user?.email.toLowerCase(),
    )
    .slice(0, 3);

  return (
    <section className="relative flex h-full max-h-103.75 w-full flex-col gap-5 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="flex w-full items-center justify-between">
        <ol className="list-disc pl-5 uppercase marker:text-electric-300">
          <li>Recent Orders</li>
        </ol>
        <Link
          to="/profile/orders"
          className="flex items-center gap-2 text-xs uppercase tracking-ultra text-electric-300 transition-colors hover:text-white"
        >
          View all
          <ArrowRight size={16} strokeWidth={1.6} />
        </Link>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {storageError && (
          <p role="alert" className="mb-3 text-xs text-red-300">
            {storageError}
          </p>
        )}
        <OrdersList
          orders={recentOrders}
          emptyMessage="Your placed orders will appear here."
          onCancel={cancelOrder}
          onDelete={deleteOrder}
        />
      </div>
    </section>
  );
};
