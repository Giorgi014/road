import { Minus, Plus, Trash2 } from "lucide-react";
import { useData } from "@/context/data";

export const CartContent = () => {
  const { cartItems, increaseCart, decreaseCart, removeCart } = useData();
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col text-white">
      <p className="mb-3 text-sm text-white/50">{itemCount} items</p>
      {cartItems.length === 0 ? (
        <p className="flex flex-1 items-center justify-center text-sm text-white/50">
          Your cart is empty.
        </p>
      ) : (
        <ul className="min-h-0 flex-1 space-y-4 overflow-y-auto py-4">
          {cartItems.map((item) => (
            <li
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-4 border-b border-white/10 pb-4"
            >
              <img
                src={item.src}
                alt={item.name}
                className="size-20 rounded-lg bg-white/5 object-contain"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-sm uppercase">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-white/55">
                  {item.selectedColor} / Size {item.selectedSize}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      decreaseCart(
                        item.id,
                        item.selectedSize,
                        item.selectedColor,
                      )
                    }
                    className="flex size-7 items-center justify-center rounded-md border border-white/15 text-white/70 hover:border-electric-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-5 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() =>
                      increaseCart(
                        item.id,
                        item.selectedSize,
                        item.selectedColor,
                      )
                    }
                    className="flex size-7 items-center justify-center rounded-md border border-white/15 text-white/70 hover:border-electric-300 hover:text-white cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}, ${item.selectedColor}, size ${item.selectedSize}`}
                    onClick={() =>
                      removeCart(item.id, item.selectedSize, item.selectedColor)
                    }
                    className="ml-auto flex size-7 items-center justify-center rounded-md text-white/50 hover:bg-red-500/10 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <footer className="border-t border-white/10 pt-5">
        <div className="flex items-center justify-between font-display uppercase">
          <span className="text-sm text-white/60">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <p className="mt-3 text-xs text-white/40">
          Checkout is not available yet.
        </p>
      </footer>
    </div>
  );
};
