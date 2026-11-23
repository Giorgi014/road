import type { PaymentDetails, SavedAddress } from "@/types";

export const SavedAddressSelector = ({
  addresses,
  value,
  onSelect,
}: {
  addresses: SavedAddress[];
  value: PaymentDetails;
  onSelect: (address: SavedAddress) => void;
}) => {
  if (addresses.length === 0) return null;

  return (
    <div className="mt-5">
      <p className="mb-2 text-[10px] uppercase tracking-wide text-white/45">
        Saved addresses
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {addresses.map((address) => (
          <button
            key={address.id}
            type="button"
            onClick={() => onSelect(address)}
            className={`min-w-48 rounded-lg border px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
              value.address === address.street
                ? "border-primary-light bg-primary/10 text-white"
                : "border-ink-400/50 text-white/60 hover:border-primary/50"
            }`}
          >
            <span className="block font-medium text-white">{address.label}</span>
            <span className="mt-1 block truncate">{address.street}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
