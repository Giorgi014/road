import type { CartItem } from "@/types";
import { getOrderPricing } from "@/lib/orderPricing";

export const CheckoutSummary = ({ items }: { items: CartItem[] }) => {
  const { subtotal, shipping, tax, total } = getOrderPricing(items);

  return (
    <aside className="h-fit rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5">
      <h2 className="font-display text-xs uppercase">Order summary</h2>
      <div className="mt-4 max-h-52 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
            className="flex gap-3"
          >
            <img
              src={item.src}
              alt={item.name}
              className="size-16 rounded-lg border border-ink-400/30 bg-ink-900/60 object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-white">{item.name}</p>
              <p className="mt-1 text-[10px] text-white/40">
                {item.selectedColor} / Size {item.selectedSize}
              </p>
              <p className="mt-2 text-sm text-primary-light">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <dl className="mt-5 border-t border-ink-400/40 pt-4 text-xs">
        <div className="flex justify-between text-white/55">
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
        <div className="mt-2 flex justify-between text-white/55">
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
        </div>
        <div className="mt-2 flex justify-between text-white/55">
          <dt>Tax</dt>
          <dd>${tax.toFixed(2)}</dd>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-ink-400/40 pt-4">
          <dt className="font-display uppercase">Total</dt>
          <dd className="text-xl text-primary-light">${total.toFixed(2)}</dd>
        </div>
      </dl>
    </aside>
  );
};
