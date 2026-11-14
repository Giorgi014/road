import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./Input";
import { type PaymentFormValues, paymentFormSchema } from "@/schema/payment";
import type { SubmitHandler } from "react-hook-form";

interface PaymentFormProps {
  values: PaymentFormValues;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<PaymentFormValues>;
}

const FIELD_CLASSES = {
  labelClassName:
    "block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50",
  fieldClassName:
    "rounded-xl border border-ink-400 bg-ink-900/70 transition-colors focus-within:border-electric-400",
  inputClassName:
    "w-full rounded-xl bg-transparent px-4 py-3 font-sans text-sm text-white outline-none placeholder:text-white/30",
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

export const PaymentForm = ({
  values,
  isEditing,
  onClose,
  onSubmit,
}: PaymentFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: values,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink-900/80 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-form-title"
        className="my-auto w-full max-w-xl rounded-2xl border border-ink-400/50 bg-ink-800 p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="payment-form-title"
            className="font-display text-lg text-white sm:text-xl"
          >
            {isEditing ? "Edit Payment Method" : "Add Payment Method"}
          </h2>
          <button
            type="button"
            aria-label="Close payment form"
            onClick={onClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-ink-400/50 text-white/60 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-5 text-xs leading-5 text-white/50">
          Demo only. The full card number and security code are used only to
          validate the form and are never saved in this browser.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div className="space-y-2">
            <Input
              variant="name"
              id="payment-cardholder"
              label="Cardholder Name"
              autoComplete="cc-name"
              required
              aria-invalid={Boolean(errors.cardholder)}
              aria-describedby={
                errors.cardholder ? "payment-cardholder-error" : undefined
              }
              {...FIELD_CLASSES}
              {...register("cardholder")}
            />
            {errors.cardholder?.message && (
              <p
                id="payment-cardholder-error"
                role="alert"
                className="text-sm text-red-300"
              >
                {errors.cardholder.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Controller
              control={control}
              name="cardNumber"
              render={({ field }) => (
                <Input
                  variant="name"
                  id="payment-card-number"
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  maxLength={23}
                  required
                  aria-invalid={Boolean(errors.cardNumber)}
                  aria-describedby={
                    errors.cardNumber ? "payment-card-number-error" : undefined
                  }
                  {...FIELD_CLASSES}
                  {...field}
                  value={formatCardNumber(field.value)}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value.replace(/\D/g, "").slice(0, 19),
                    )
                  }
                />
              )}
            />
            {errors.cardNumber?.message && (
              <p
                id="payment-card-number-error"
                role="alert"
                className="text-sm text-red-300"
              >
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Controller
                control={control}
                name="expiry"
                render={({ field }) => (
                  <Input
                    variant="name"
                    id="payment-expiry"
                    label="Expiry Date"
                    placeholder="MM/YY"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    maxLength={5}
                    required
                    aria-invalid={Boolean(errors.expiry)}
                    aria-describedby={
                      errors.expiry ? "payment-expiry-error" : undefined
                    }
                    {...FIELD_CLASSES}
                    {...field}
                    value={formatExpiry(field.value)}
                    onChange={(event) =>
                      field.onChange(formatExpiry(event.target.value))
                    }
                  />
                )}
              />
              {errors.expiry?.message && (
                <p
                  id="payment-expiry-error"
                  role="alert"
                  className="text-sm text-red-300"
                >
                  {errors.expiry.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Controller
                control={control}
                name="securityCode"
                render={({ field }) => (
                  <Input
                    variant="name"
                    id="payment-security-code"
                    label="Security Code"
                    type="password"
                    placeholder="CVV"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    required
                    aria-invalid={Boolean(errors.securityCode)}
                    aria-describedby={
                      errors.securityCode
                        ? "payment-security-code-error"
                        : undefined
                    }
                    {...FIELD_CLASSES}
                    {...field}
                    value={field.value.replace(/\D/g, "").slice(0, 4)}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                  />
                )}
              />
              {errors.securityCode?.message && (
                <p
                  id="payment-security-code-error"
                  role="alert"
                  className="text-sm text-red-300"
                >
                  {errors.securityCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-ink-400/50 px-5 py-3 font-sans text-xs uppercase tracking-wider text-white/70 transition-colors hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-(image:--pill-grad) px-5 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            >
              {isEditing ? "Save Changes" : "Save Payment Method"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
