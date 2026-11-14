import { CreditCard, Pencil, Trash2 } from "lucide-react";
import type { SavedPaymentMethod } from "@/schema/payment";

interface PaymentCardProps {
	paymentMethod: SavedPaymentMethod;
	isManaging: boolean;
	onEdit: (paymentMethod: SavedPaymentMethod) => void;
	onDelete: (id: string) => void;
	onSetDefault: (id: string) => void;
}

const ACTION_BUTTON =
	"flex size-10 cursor-pointer items-center justify-center rounded-xl border bg-ink-900/50 transition-colors";

export const PaymentCard = ({
	paymentMethod,
	isManaging,
	onEdit,
	onDelete,
	onSetDefault,
}: PaymentCardProps) => (
	<article className="relative flex h-62 min-h-62 flex-col overflow-hidden rounded-xl border border-ink-400/40 bg-ink-900/35 p-5 sm:p-6">
		<div className="mb-5 flex items-center justify-between gap-2">
			<CreditCard size={22} className="shrink-0 text-electric-300" />
			{paymentMethod.isDefault ? (
				<span className="rounded-lg bg-linear-to-r from-electric-600 to-electric-500 px-3 py-1 text-xs text-white shadow-[0_0_16px_rgba(104,71,255,.25)]">
					Default
				</span>
			) : isManaging ? (
				<button
					type="button"
					onClick={() => onSetDefault(paymentMethod.id)}
					className="cursor-pointer rounded-lg border border-electric-300/40 px-2 py-1 text-[9px] uppercase tracking-wider text-electric-300 transition-colors hover:bg-electric-500/10"
				>
					Set default
				</button>
			) : (
				<span className="text-xs uppercase tracking-wider text-white/50">
					{paymentMethod.brand}
				</span>
			)}
		</div>

		<p className="font-display text-lg tracking-[0.12em] text-white">
			•••• •••• •••• {paymentMethod.last4}
		</p>
		<div className="mt-auto flex min-w-0 items-end justify-between gap-2 pr-22">
			<div className="min-w-0">
				<p className="truncate text-[9px] uppercase tracking-wider text-white/40">
					{paymentMethod.cardholder}
				</p>
				<p className="mt-1 text-xs text-white/70">
					{paymentMethod.brand} · Expires {paymentMethod.expiry}
				</p>
			</div>
		</div>

		{isManaging && (
			<div className="absolute bottom-4 right-4 flex gap-2">
				<button
					type="button"
					aria-label={`Edit ${paymentMethod.brand} ending in ${paymentMethod.last4}`}
					onClick={() => onEdit(paymentMethod)}
					className={`${ACTION_BUTTON} border-ink-400/40 text-electric-300 hover:border-electric-300/50 hover:bg-electric-500/10`}
				>
					<Pencil size={17} strokeWidth={1.6} />
				</button>
				<button
					type="button"
					aria-label={`Delete ${paymentMethod.brand} ending in ${paymentMethod.last4}`}
					onClick={() => onDelete(paymentMethod.id)}
					className={`${ACTION_BUTTON} border-red-400/30 text-red-300 hover:border-red-300/60 hover:bg-red-400/10`}
				>
					<Trash2 size={17} strokeWidth={1.6} />
				</button>
			</div>
		)}
	</article>
);
