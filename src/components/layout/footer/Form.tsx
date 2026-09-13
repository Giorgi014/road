import type { FooterFormProps } from "@/types";
import { ArrowRight } from "lucide-react";

export const Form = ({ submit, email, sent, setEmail }: FooterFormProps) => {
  return (
    <form onSubmit={submit} className="mt-10 max-w-[448px]">
      <section className="flex items-center gap-2 rounded-full border border-[#1b2d72] bg-[#07102b]/70 p-1.5 backdrop-blur-xl focus-within:border-[#4267ff]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border-none bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/30"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#3155ff_0%,#6847ff_100%)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-shadow hover:shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)]"
        >
          Subscribe
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
            <ArrowRight size={12} />
          </span>
        </button>
      </section>
      {sent && (
        <p className="mt-3 text-xs text-[#00a8ff]">
          You're on the list. Welcome to the road.
        </p>
      )}
    </form>
  );
};
