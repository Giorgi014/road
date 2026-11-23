import { PAYMENT_METHODS } from "@/data";
import type { PaymentMethod } from "@/types";

export const PaymentMethodStep = ({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}) => (
  <section>
    <h2 className="font-display text-sm uppercase">
      Choose your payment method
    </h2>
    <div className="mt-5 grid gap-2">
      {PAYMENT_METHODS.map((method) => {
        const Icon = method.icon;
        const active = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all cursor-pointer ${
              active
                ? "border-primary-light bg-primary/10 shadow-[0_0_20px_-12px_var(--blue-glow)]"
                : "border-ink-400/50 bg-ink-800/30 hover:border-primary/50"
            }`}
          >
            <span
              className={`size-4 rounded-full border flex items-center justify-center ${active ? "border-primary-light" : "border-white/35"}`}
            >
              {active && (
                <span className="size-2 rounded-full bg-primary-light" />
              )}
            </span>
            <Icon
              size={19}
              className={active ? "text-primary-light" : "text-white/60"}
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white">{method.label}</span>
              <span className="mt-0.5 block text-[11px] text-white/40">
                {method.detail}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  </section>
);
