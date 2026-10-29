import type { FooterFormProps } from "@/types";
import { ArrowRight } from "lucide-react";

export const Form = ({ submit, email, sent, setEmail }: FooterFormProps) => {
  return (
    <form onSubmit={submit} className="w-full mt-10 max-w-md overflow-hidden">
      <section className="flex items-center gap-2 rounded-full border border-ink-400 bg-ink-800/70 p-1.5 backdrop-blur-xl focus-within:border-electric-400">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="min-w-0 flex-1 border-none bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 sm:px-5"
        />
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-(image:--pill-grad) px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_var(--blue-glow)] cursor-pointer sm:px-6"
        >
          <span className="hidden sm:inline">Subscribe</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={14} />
          </span>
        </button>
      </section>
      {sent && (
        <p className="mt-3 text-xs text-electric-300">
          You're on the list. Welcome to the road.
        </p>
      )}
    </form>
  );
};
