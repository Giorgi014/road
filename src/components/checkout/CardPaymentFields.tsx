import type { SavedPaymentMethod } from "@/schema/payment";
import type { PaymentDetails } from "@/types";
import {
  checkoutInputClass,
  formatCardNumber,
  formatExpiry,
} from "@/lib/checkout";
import { CheckoutField } from "./CheckoutField";

export const CardPaymentFields = ({
  value,
  savedCards,
  onChange,
}: {
  value: PaymentDetails;
  savedCards: SavedPaymentMethod[];
  onChange: (value: PaymentDetails) => void;
}) => {
  const setField = (field: keyof PaymentDetails, fieldValue: string) =>
    onChange({ ...value, [field]: fieldValue });

  return (
    <>
      {savedCards.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-[10px] uppercase tracking-wide text-white/45">
            Saved cards
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {savedCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    savedCardId: card.id,
                    cardNumber: card.last4,
                    expiry: card.expiry,
                    cvv: "",
                  })
                }
                className={`rounded-lg border px-3 py-3 text-left cursor-pointer ${
                  value.savedCardId === card.id
                    ? "border-primary-light bg-primary/10"
                    : "border-ink-400/50 hover:border-primary/50"
                }`}
              >
                <span className="block text-xs text-white">
                  {card.brand} •••• {card.last4}
                </span>
                <span className="mt-1 block text-[10px] text-white/40">
                  Expires {card.expiry}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {value.savedCardId ? (
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              savedCardId: "",
              cardNumber: "",
              expiry: "",
              cvv: "",
            })
          }
          className="mt-3 text-[10px] uppercase text-primary-light cursor-pointer"
        >
          Use a different card
        </button>
      ) : (
        <>
          <CheckoutField label="Card number" className="mt-4 block">
            <input
              inputMode="numeric"
              className={checkoutInputClass}
              value={formatCardNumber(value.cardNumber)}
              onChange={(event) =>
                setField(
                  "cardNumber",
                  event.target.value.replace(/\D/g, "").slice(0, 19),
                )
              }
              placeholder="4242 4242 4242 4242"
            />
          </CheckoutField>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <CheckoutField label="Expiry">
              <input
                className={checkoutInputClass}
                value={formatExpiry(value.expiry)}
                onChange={(event) =>
                  setField("expiry", formatExpiry(event.target.value))
                }
                placeholder="MM/YY"
              />
            </CheckoutField>
            <CheckoutField label="CVV">
              <input
                inputMode="numeric"
                className={checkoutInputClass}
                value={value.cvv}
                onChange={(event) =>
                  setField(
                    "cvv",
                    event.target.value.replace(/\D/g, "").slice(0, 4),
                  )
                }
                placeholder="123"
              />
            </CheckoutField>
          </div>
        </>
      )}
    </>
  );
};
