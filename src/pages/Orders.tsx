import { useMemo, useState } from "react";
import { ProfileNavigation } from "@/components/layout";
import {
  OrdersFilterBar,
  OrdersList,
  type OrderFilter,
} from "@/components/profile/orders";
import { useAuth } from "@/context/auth";
import { useSavedOrders } from "@/hooks";

const Orders = () => {
  const { user } = useAuth();
  const { orders, storageError, cancelOrder, deleteOrder } = useSavedOrders();
  const [filter, setFilter] = useState<OrderFilter>("All");
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (order.customerEmail.toLowerCase() !== user?.email.toLowerCase()) {
        return false;
      }
      if (filter !== "All" && order.status !== filter) return false;
      if (!query) return true;
      return (
        order.id.toLowerCase().includes(query) ||
        order.items.some((item) => item.name.toLowerCase().includes(query))
      );
    });
  }, [orders, user?.email, filter, search]);

  return (
    <main className="mx-auto mt-19 flex w-full max-w-[1600px] flex-col items-center gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
      <ProfileNavigation />
      <section className="w-full min-w-0 rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm sm:p-6">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-ultra text-electric-300">
              My Orders
            </p>
            <h1 className="mt-2 font-display text-xl uppercase text-white sm:text-2xl">
              Order history
            </h1>
            <p className="mt-2 text-xs text-white/45">
              Track and review your ROAD orders.
            </p>
          </div>
          <p className="text-xs text-white/45">
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1 ? "order" : "orders"}
          </p>
        </header>

        <OrdersFilterBar
          filter={filter}
          search={search}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
        />

        {storageError && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {storageError}
          </p>
        )}

        <div className="mt-5">
          <OrdersList
            orders={filteredOrders}
            emptyMessage={
              search || filter !== "All"
                ? "No orders match your search or filter."
                : "You have not placed any orders yet."
            }
            onCancel={cancelOrder}
            onDelete={deleteOrder}
          />
        </div>
      </section>
    </main>
  );
};

export default Orders;
