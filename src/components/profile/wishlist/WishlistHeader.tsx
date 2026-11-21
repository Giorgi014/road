import { Heart, Share2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui";

interface WishlistHeaderProps {
  itemCount: number;
  shareMessage: string;
  canAddAll: boolean;
  onShare: () => void;
  onAddAll: () => void;
}

export const WishlistHeader = ({
  itemCount,
  shareMessage,
  canAddAll,
  onShare,
  onAddAll,
}: WishlistHeaderProps) => (
  <>
    <div className="flex flex-col gap-5 border-b border-ink-400/30 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-ultra text-electric-300">
          <Heart size={13} />
          My Wishlist
        </p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
          Your Wishlist
        </h1>
        <p className="mt-2 text-sm text-(--ink-dim)">
          {itemCount} saved {itemCount === 1 ? "item" : "items"}, all in one
          place.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onShare}
          disabled={itemCount === 0}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-ink-400/50 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-electric-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Share2 size={15} />
          Share Wishlist
        </button>
        <Button
          variant="action"
          onClick={onAddAll}
          disabled={!canAddAll}
          label="Move All to Bag"
          icon={<ShoppingBag size={15} />}
        />
      </div>
    </div>
    {shareMessage && (
      <p role="status" className="mt-3 text-xs text-electric-300">
        {shareMessage}
      </p>
    )}
  </>
);
