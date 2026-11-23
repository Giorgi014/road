import { ShieldCheck, Truck } from "lucide-react";
import { PAYMENT_METHOD_LABELS } from "@/data";
import type { PaymentDetails, PaymentMethod } from "@/types";

export const ReviewStep = ({
  method,
  details,
}: {
  method: PaymentMethod;
  details: PaymentDetails;
}) => (
  <section className="space-y-3">
    <h2 className="font-display text-sm uppercase">Review & confirm</h2>
    <div className="mt-5 rounded-xl border border-ink-400/50 bg-ink-800/30 p-4">
      <p className="text-[10px] uppercase tracking-wide text-primary-light">
        Payment method
      </p>
      <p className="mt-2 text-sm text-white">{PAYMENT_METHOD_LABELS[method]}</p>
      {method === "card" && details.cardNumber && (
        <p className="mt-1 text-xs text-white/45">
          •••• •••• •••• {details.cardNumber.slice(-4)}
        </p>
      )}
    </div>
    <div className="rounded-xl border border-ink-400/50 bg-ink-800/30 p-4">
      <p className="text-[10px] uppercase tracking-wide text-primary-light">
        Billing address
      </p>
      <p className="mt-2 text-sm text-white">{details.name || "Customer"}</p>
      <p className="mt-1 text-xs text-white/45">
        {details.address || "No address entered"}
      </p>
      <p className="text-xs text-white/45">
        {[details.city, details.postalCode].filter(Boolean).join(", ")}
      </p>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-[11px] text-white/65">
        <ShieldCheck size={16} className="text-emerald-400" />
        Secure payment
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-[11px] text-white/65">
        <Truck size={16} className="text-cyan-400" />
        Standard shipping
      </div>
    </div>
  </section>
);
