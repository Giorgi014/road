import { ArrowLeft } from "lucide-react";

type CheckoutActionsProps = {
  step: number;
  onBack: () => void;
  onContinue: () => void;
  onPlaceOrder: () => void;
};

export const CheckoutActions = ({
  step,
  onBack,
  onContinue,
  onPlaceOrder,
}: CheckoutActionsProps) => (
  <div className="mt-7 flex items-center justify-between border-t border-ink-400/40 pt-5">
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-2 text-xs uppercase text-white/50 hover:text-white cursor-pointer"
    >
      <ArrowLeft size={14} /> {step === 1 ? "Back" : "Previous"}
    </button>
    {step < 3 ? (
      <button
        type="button"
        onClick={onContinue}
        className="rounded-xl bg-(image:--pill-grad) px-6 py-3 text-xs uppercase tracking-wide text-white cursor-pointer"
      >
        Continue
      </button>
    ) : (
      <button
        type="button"
        onClick={onPlaceOrder}
        className="rounded-xl bg-(image:--pill-grad) px-6 py-3 text-xs uppercase tracking-wide text-white shadow-[0_12px_35px_-18px_var(--blue-glow)] cursor-pointer"
      >
        Place order &amp; pay
      </button>
    )}
  </div>
);
