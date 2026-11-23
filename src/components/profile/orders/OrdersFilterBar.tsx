import { Search } from "lucide-react";
import { ORDER_STATUS_FILTERS } from "@/data";

export type OrderFilter = (typeof ORDER_STATUS_FILTERS)[number];

export const OrdersFilterBar = ({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}: {
  filter: OrderFilter;
  search: string;
  onFilterChange: (filter: OrderFilter) => void;
  onSearchChange: (value: string) => void;
}) => (
  <div className="space-y-4">
    <label className="flex items-center gap-2 rounded-lg border border-ink-400/40 bg-ink-900/40 px-3 py-2 text-white/45 sm:max-w-xs">
      <Search size={15} />
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search orders..."
        className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/35"
      />
    </label>

    <div className="flex gap-2 overflow-x-auto border-b border-ink-400/30 pb-2">
      {ORDER_STATUS_FILTERS.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onFilterChange(status)}
          className={`shrink-0 rounded-lg px-3 py-2 text-[9px] uppercase tracking-wide transition-colors cursor-pointer ${
            filter === status
              ? "bg-primary/25 text-primary-light"
              : "text-white/45 hover:text-white"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>
);


