import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { ADDRESS_FIELDS } from "@/data";
import { addressFormSchema } from "@/schema/address";
import type { AddressFormValues } from "@/schema/address";
import type { SubmitHandler } from "react-hook-form";

interface AddressFormProps {
  values: AddressFormValues;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<AddressFormValues>;
}

const FIELD_CLASSES = {
  labelClassName:
    "block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50",
  fieldClassName:
    "rounded-xl border border-ink-400 bg-ink-900/70 transition-colors focus-within:border-electric-400",
  inputClassName:
    "w-full rounded-xl bg-transparent px-4 py-3 font-sans text-sm text-white outline-none placeholder:text-white/30",
};

export const AddressForm = ({
  values,
  isEditing,
  onClose,
  onSubmit,
}: AddressFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: values,
    mode: "onBlur",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink-900/80 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-form-title"
        className="my-auto w-full max-w-xl rounded-2xl border border-ink-400/50 bg-ink-800 p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="address-form-title"
            className="font-display text-lg text-white sm:text-xl"
          >
            {isEditing ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            type="button"
            aria-label="Close address form"
            onClick={onClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-ink-400/50 text-white/60 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {ADDRESS_FIELDS.map((field) => {
              const error = errors[field.id];
              const errorId = `address-${field.id}-error`;

              return (
                <div
                  key={field.id}
                  className={
                    field.fullWidth ? "space-y-2 sm:col-span-2" : "space-y-2"
                  }
                >
                  <Input
                    variant="name"
                    id={`address-${field.id}`}
                    label={field.label}
                    type={field.type ?? "text"}
                    placeholder=""
                    autoComplete={field.autoComplete}
                    required
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    {...FIELD_CLASSES}
                    {...register(field.id)}
                  />
                  {error?.message && (
                    <p
                      id={errorId}
                      role="alert"
                      className="text-sm text-red-300"
                    >
                      {error.message}
                    </p>
                  )}
                </div>
              );
            })}
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
              {isEditing ? "Save Changes" : "Save Address"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
