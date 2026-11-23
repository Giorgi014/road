import { X } from "lucide-react";
import { CHECKOUT_COPY } from "@/data";
import type { SavedPaymentMethod } from "@/schema/payment";
import type { PaymentDetails, PaymentMethod, SavedAddress } from "@/types";
import { AlternativePaymentFields } from "./AlternativePaymentFields";
import { BillingAddressFields } from "./BillingAddressFields";
import { CardPaymentFields } from "./CardPaymentFields";
import { SavedAddressSelector } from "./SavedAddressSelector";

type PaymentDetailsStepProps = {
  method: PaymentMethod;
  value: PaymentDetails;
  onChange: (value: PaymentDetails) => void;
  savedAddresses: SavedAddress[];
  savedCards: SavedPaymentMethod[];
  validationErrors: string[];
  shouldSaveDetails: boolean;
  onSaveDetailsChange: (value: boolean) => void;
  onSelectAddress: (address: SavedAddress) => void;
  onClearSavedDetails: () => void;
};

export const PaymentDetailsStep = ({
  method,
  value,
  onChange,
  savedAddresses,
  savedCards,
  validationErrors,
  shouldSaveDetails,
  onSaveDetailsChange,
  onSelectAddress,
  onClearSavedDetails,
}: PaymentDetailsStepProps) => (
  <section>
    <div className="flex items-start justify-between gap-3">
      <h2 className="font-display text-sm uppercase">
        {CHECKOUT_COPY.paymentDetailsTitle}
      </h2>
      <button
        type="button"
        onClick={onClearSavedDetails}
        className="flex items-center gap-1 text-[10px] uppercase text-white/45 hover:text-red-300 cursor-pointer"
      >
        <X size={12} /> {CHECKOUT_COPY.clearDetails}
      </button>
    </div>

    {validationErrors.length > 0 && (
      <div
        role="alert"
        className="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 p-3"
      >
        {validationErrors.map((error) => (
          <p key={error} className="text-xs text-red-300">
            {error}
          </p>
        ))}
      </div>
    )}

    <SavedAddressSelector
      addresses={savedAddresses}
      value={value}
      onSelect={onSelectAddress}
    />

    {method === "card" && (
      <CardPaymentFields
        value={value}
        savedCards={savedCards}
        onChange={onChange}
      />
    )}
    {method !== "card" && (
      <AlternativePaymentFields
        method={method}
        value={value}
        onChange={onChange}
      />
    )}

    <BillingAddressFields value={value} onChange={onChange} />

    <label className="mt-5 flex items-center gap-2 text-xs text-white/55 cursor-pointer">
      <input
        type="checkbox"
        checked={shouldSaveDetails}
        onChange={(event) => onSaveDetailsChange(event.target.checked)}
        className="size-4 accent-primary"
      />
      {CHECKOUT_COPY.saveDetails}
    </label>
  </section>
);
