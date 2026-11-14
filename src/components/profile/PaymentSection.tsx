import { Plus } from "lucide-react";
import { useState } from "react";
import { PaymentCard, PaymentForm } from "@/components/ui";
import { useSavedPaymentMethods } from "@/hooks/useSavedPaymentMethods";
import type { PaymentFormValues, SavedPaymentMethod } from "@/schema/payment";

const EMPTY_FORM: PaymentFormValues = {
  cardholder: "",
  cardNumber: "",
  expiry: "",
  securityCode: "",
};

const PAYMENT_ITEM_WIDTH = "w-2/3 sm:w-1/3 min-[850px]:w-[22.222%]";

type PaymentFormMode =
  | { type: "add" }
  | { type: "edit"; paymentMethod: SavedPaymentMethod };

const toFormValues = (
  paymentMethod: SavedPaymentMethod,
): PaymentFormValues => ({
  cardholder: paymentMethod.cardholder,
  cardNumber: "",
  expiry: paymentMethod.expiry,
  securityCode: "",
});

export const PaymentSection = () => {
  const {
    paymentMethods,
    storageError,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
  } = useSavedPaymentMethods();
  const [isManaging, setIsManaging] = useState(false);
  const [formMode, setFormMode] = useState<PaymentFormMode | null>(null);

  const handleSubmit = (values: PaymentFormValues) => {
    const saved =
      formMode?.type === "edit"
        ? updatePaymentMethod(formMode.paymentMethod.id, values)
        : addPaymentMethod(values);

    if (saved) setFormMode(null);
  };

  return (
    <section className="relative mt-5 flex w-full flex-col gap-8 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 font-sans backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <ol className="list-disc pl-5 uppercase marker:text-electric-300">
            <li className="text-xs tracking-ultra">Payment Methods</li>
          </ol>
          <button
            type="button"
            onClick={() => setIsManaging((current) => !current)}
            className="cursor-pointer text-xs uppercase tracking-ultra text-electric-300 transition-colors hover:text-white"
          >
            {isManaging ? "Done" : "Manage"}
          </button>
        </div>

        <p className="text-xs leading-5 text-white/45">
          Demo payment methods are saved in this browser. Full card numbers and
          security codes are never stored.
        </p>

        {storageError && (
          <p role="alert" className="text-sm text-red-300">
            {storageError}
          </p>
        )}
      </div>

      <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
        {paymentMethods.map((paymentMethod) => (
          <div
            key={paymentMethod.id}
            className={`min-w-0 shrink-0 ${PAYMENT_ITEM_WIDTH}`}
          >
            <PaymentCard
              paymentMethod={paymentMethod}
              isManaging={isManaging}
              onEdit={(method) =>
                setFormMode({ type: "edit", paymentMethod: method })
              }
              onDelete={deletePaymentMethod}
              onSetDefault={setDefaultPaymentMethod}
            />
          </div>
        ))}

        <div className={`min-w-0 shrink-0 ${PAYMENT_ITEM_WIDTH}`}>
          <button
            type="button"
            onClick={() => setFormMode({ type: "add" })}
            className="flex h-62 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-ink-400/70 bg-ink-900/20 text-sm font-medium uppercase tracking-wide text-electric-300 transition-colors hover:border-electric-300/60 hover:bg-electric-500/5"
          >
            <span className="flex size-11 items-center justify-center rounded-xl border border-electric-500/70 text-electric-300">
              <Plus size={24} strokeWidth={1.6} />
            </span>
            Add Payment Method
          </button>
        </div>
      </div>

      {formMode && (
        <PaymentForm
          values={
            formMode.type === "edit"
              ? toFormValues(formMode.paymentMethod)
              : EMPTY_FORM
          }
          isEditing={formMode.type === "edit"}
          onClose={() => setFormMode(null)}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
};
