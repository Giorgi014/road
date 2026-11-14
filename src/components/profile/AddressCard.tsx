import { Pencil, Trash2 } from "lucide-react";
import type { SavedAddress } from "@/types";

interface AddressCardProps {
  address: SavedAddress;
  isManaging: boolean;
  onEdit: (address: SavedAddress) => void;
  onDelete: (id: string) => void;
}

const ACTION_BUTTON =
  "flex size-11 cursor-pointer items-center justify-center rounded-xl border bg-ink-900/50 transition-colors";

export const AddressCard = ({
  address,
  isManaging,
  onEdit,
  onDelete,
}: AddressCardProps) => (
  <article className="relative flex min-h-62 flex-col items-start rounded-xl border border-ink-400/40 bg-ink-900/35 p-6 sm:p-7">
    <div className="mb-5 flex min-h-7 items-center gap-2">
      {address.isDefault ? (
        <>
          <span className="rounded-lg bg-linear-to-r from-electric-600 to-electric-500 px-3 py-1 text-xs text-white shadow-[0_0_16px_rgba(104,71,255,.25)]">
            Default
          </span>
          <span className="text-[9px] uppercase tracking-wider text-white/40">
            {address.label}
          </span>
        </>
      ) : (
        <h3 className="text-base font-medium text-white">{address.label}</h3>
      )}
    </div>

    <address className="flex flex-col gap-2 pr-12 not-italic text-base leading-6 text-white/75">
      <span>{address.street}</span>
      <span>
        {address.city}, {address.region} {address.postalCode}
      </span>
      <span>{address.country}</span>
      <span>{address.phone}</span>
    </address>

    <div className="absolute bottom-5 right-5 flex gap-2">
      <button
        type="button"
        aria-label={`Edit ${address.label.toLowerCase()} address`}
        onClick={() => onEdit(address)}
        className={`${ACTION_BUTTON} border-ink-400/40 text-electric-300 hover:border-electric-300/50 hover:bg-electric-500/10`}
      >
        <Pencil size={19} strokeWidth={1.6} />
      </button>
      {isManaging && (
        <button
          type="button"
          aria-label={`Delete ${address.label.toLowerCase()} address`}
          onClick={() => onDelete(address.id)}
          className={`${ACTION_BUTTON} border-red-400/30 text-red-300 hover:border-red-300/60 hover:bg-red-400/10`}
        >
          <Trash2 size={18} strokeWidth={1.6} />
        </button>
      )}
    </div>
  </article>
);
