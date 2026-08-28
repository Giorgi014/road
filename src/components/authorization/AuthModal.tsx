import { X } from "lucide-react";
import { Auth } from "./Auth";

type AuthModalProps = {
  onClose: () => void;
};

export const AuthModal = ({ onClose }: AuthModalProps) => {
  return (
    <article className="fixed inset-0 z-99999 flex items-center justify-center bg-[rgba(3,8,23,0.85)] backdrop-blur-sm">
      <div className="flex justify-center items-center relative w-full max-w-130 bg-[#0b1745] p-10">
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 z-9999999 cursor-pointer"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <Auth />
      </div>
    </article>
  );
};
