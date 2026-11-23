import { Check } from "lucide-react";

const steps = [
  "Select Method",
  "Payment Details",
  "Review & Confirm",
  "Payment Complete",
];

export const CheckoutStepper = ({ step }: { step: number }) => (
  <ol className="grid grid-cols-4 items-start" aria-label="Checkout progress">
    {steps.map((label, index) => {
      const number = index + 1;
      const isComplete = number < step;
      const isActive = number === step;

      return (
        <li
          key={label}
          className="relative flex flex-col items-center text-center"
        >
          {index > 0 && (
            <span
              className={`absolute right-1/2 top-3 h-px w-full ${
                number <= step ? "bg-primary/70" : "bg-ink-400/50"
              }`}
            />
          )}
          <span
            className={`z-10 flex size-6 items-center justify-center rounded-full border text-[10px] ${
              isComplete
                ? "border-primary bg-primary text-white"
                : isActive
                  ? "border-primary-light bg-primary-light text-white shadow-[0_0_18px_var(--blue-glow)]"
                  : "border-ink-400/70 bg-ink-800 text-white/45"
            }`}
          >
            {isComplete ? <Check size={13} /> : number}
          </span>
          <span
            className={`mt-2 hidden text-[9px] uppercase tracking-wide sm:block ${
              isActive ? "text-primary-light" : "text-white/40"
            }`}
          >
            {label}
          </span>
        </li>
      );
    })}
  </ol>
);
