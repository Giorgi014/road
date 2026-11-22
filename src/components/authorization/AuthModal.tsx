import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { AuthModalProps } from "@/types";
import { Auth } from "./Auth";

export const AuthModal = ({ onClose, onSuccess }: AuthModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const modal = modalRef.current;
    modal?.querySelector<HTMLElement>("button, input")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modal) return;
      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <article
      className="auth-modal fixed inset-0 z-99999 flex items-center justify-center"
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Authentication"
        className="relative z-10 flex h-auto w-full max-w-130 items-center justify-center rounded-4xl bg-ink-700 p-10 max-md:h-dvh max-md:max-w-none max-md:rounded-none max-md:overflow-y-auto max-md:p-5"
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 z-9999999 cursor-pointer"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <Auth onClose={onClose} onSuccess={onSuccess} />
      </div>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close authentication dialog"
        className="absolute inset-0 cursor-default bg-ink-900/85 backdrop-blur-sm"
        onClick={onClose}
      />
    </article>,
    document.body,
  );
};
