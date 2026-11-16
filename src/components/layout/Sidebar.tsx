import { X } from "lucide-react";
import type { SidebarProps } from "@/types";

export const Sidebar = ({ children, isOpen, onClose, title }: SidebarProps) => (
  <>
    <button
      type="button"
      aria-label="Close sidebar"
      onClick={onClose}
      className={`absolute inset-0 h-full w-full bg-ink-900/70 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    />
    <aside
      className={`absolute right-0 top-0 z-10 flex h-full w-full max-w-[448px] flex-col bg-ink-700 p-8 transition-transform duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="mb-12 flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-white">
          {title}
        </span>
        <button
          type="button"
          aria-label="Close sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 cursor-pointer"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </aside>
  </>
);
