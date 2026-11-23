import { Check } from "lucide-react";

export const SuccessStep = ({
  orderId,
  onContinue,
}: {
  orderId: string;
  onContinue: () => void;
}) => (
  <section className="flex min-h-105 flex-col items-center justify-center text-center">
    <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-emerald-400 text-emerald-400 shadow-[0_0_35px_rgba(52,211,153,.35)]">
      <div className="absolute inset-2 rounded-full border border-emerald-300/40" />
      <Check size={46} strokeWidth={2.5} />
    </div>
    <h2 className="mt-7 font-display text-lg uppercase">Payment successful</h2>
    <p className="mt-3 max-w-sm text-sm text-white/55">
      Thank you. Your order has been placed successfully.
    </p>
    <div className="mt-6 rounded-lg border border-ink-400/40 px-5 py-3">
      <p className="text-[10px] uppercase tracking-wide text-white/40">Order</p>
      <p className="mt-1 font-display text-sm text-primary-light">{orderId}</p>
    </div>
    <button
      type="button"
      onClick={onContinue}
      className="mt-7 rounded-xl bg-(image:--pill-grad) px-8 py-3 font-display text-xs uppercase tracking-wide text-white cursor-pointer"
    >
      Continue shopping
    </button>
  </section>
);
