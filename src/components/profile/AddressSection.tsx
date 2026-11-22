import { Plus } from "lucide-react";
import { useState } from "react";
import { AddressCard, AddressForm } from "@/components/ui";
import { useSavedAddresses } from "@/hooks/useSavedAddresses";
import type { AddressFormValues } from "@/schema/address";
import type { SavedAddress } from "@/types";

const EMPTY_FORM: AddressFormValues = {
  label: "",
  street: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
  phone: "",
};

const ADDRESS_ITEM_WIDTH = "w-2/3 sm:w-1/3 min-[850px]:w-[22.222%]";

type AddressFormMode =
  | { type: "add" }
  | { type: "edit"; address: SavedAddress };

const toFormValues = ({
  label,
  street,
  city,
  region,
  postalCode,
  country,
  phone,
}: SavedAddress): AddressFormValues => ({
  label,
  street,
  city,
  region,
  postalCode,
  country,
  phone,
});

export const AddressSection = () => {
  const { addresses, storageError, addAddress, updateAddress, deleteAddress } =
    useSavedAddresses();
  const [isManaging, setIsManaging] = useState(false);
  const [formMode, setFormMode] = useState<AddressFormMode | null>(null);

  const handleSubmit = (values: AddressFormValues) => {
    if (formMode?.type === "edit") {
      updateAddress(formMode.address.id, values);
    } else {
      addAddress(values);
    }
    setFormMode(null);
  };

  return (
    <section className="relative flex w-full flex-col gap-8 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 font-sans backdrop-blur-sm transition-all duration-300 sm:p-6">
      <div className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <ol className="list-disc pl-5 uppercase marker:text-electric-300">
            <li className="text-xs tracking-ultra">Saved Addresses</li>
          </ol>
          <button
            type="button"
            onClick={() => setIsManaging((current) => !current)}
            className="cursor-pointer text-xs uppercase tracking-ultra text-electric-300 transition-colors hover:text-white"
          >
            {isManaging ? "Done" : "Manage"}
          </button>
        </div>

        {storageError && (
          <p role="alert" className="text-sm text-red-300">
            {storageError}
          </p>
        )}
      </div>

      <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`min-w-0 shrink-0 ${ADDRESS_ITEM_WIDTH}`}
          >
            <AddressCard
              address={address}
              isManaging={isManaging}
              onEdit={(address) => setFormMode({ type: "edit", address })}
              onDelete={deleteAddress}
            />
          </div>
        ))}

        <div className={`min-w-0 shrink-0 ${ADDRESS_ITEM_WIDTH}`}>
          <button
            type="button"
            onClick={() => setFormMode({ type: "add" })}
            className="flex h-62 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-ink-400/70 bg-ink-900/20 text-sm font-medium uppercase tracking-wide text-electric-300 transition-colors hover:border-electric-300/60 hover:bg-electric-500/5"
          >
            <span className="flex size-11 items-center justify-center rounded-xl border border-electric-500/70 text-electric-300">
              <Plus size={24} strokeWidth={1.6} />
            </span>
            Add New Address
          </button>
        </div>
      </div>

      {formMode && (
        <AddressForm
          values={
            formMode.type === "edit"
              ? toFormValues(formMode.address)
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
