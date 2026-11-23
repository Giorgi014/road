import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export const CheckoutHeader = () => (
  <header className="flex h-14 items-center justify-between border-b border-ink-400/30">
    <Link to="/" className="font-display text-xl tracking-wide text-white">
      ROAD
    </Link>
    <span className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-primary-light">
      <LockKeyhole size={13} />
      Secure checkout
    </span>
  </header>
);
