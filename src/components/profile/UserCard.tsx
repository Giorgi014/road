import { USER_INFO } from "@/data";
import { Calendar1, ShieldCheck } from "lucide-react";

export const UserCard = () => {
  return (
    <section className="relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6 lg:flex-row lg:items-stretch">
      <div className="relative flex min-h-52 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-electric-500/20 bg-[linear-gradient(135deg,var(--color-electric-600)/30%,rgba(255,255,255,.03)_55%,rgba(255,255,255,.01))] lg:w-[clamp(220px,28vw,340px)]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-electric-500/20 blur-3xl" />
        <div className="relative flex size-28 items-center justify-center rounded-full border border-white/15 bg-ink-900/80 font-display text-4xl font-bold text-gradient-blue shadow-[0_0_40px_-12px_var(--color-electric-500)] sm:size-32 sm:text-5xl">
          {USER_INFO.firstName[0]}
          {USER_INFO.lastName[0]}
        </div>
        <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-ultra text-white/35">
          Explorer ID / {USER_INFO.level}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-ultra text-electric-300">
            Profile
          </p>
          <h3 className="font-display text-[clamp(28px,4vw,36px)] font-bold uppercase tracking-wide text-white">
            {USER_INFO.firstName} {USER_INFO.lastName}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-ultra text-electric-300">
            {USER_INFO.rank}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-electric-500/30 bg-electric-600/10 px-3 py-1.5 text-[10px] uppercase tracking-ultra text-white">
              Level {USER_INFO.level}
            </span>
            <span className="flex items-center gap-2 text-xs text-white/45">
              <Calendar1 size={14} strokeWidth={1.6} />
              <span>
                Member since {USER_INFO.month} {USER_INFO.year}
              </span>
            </span>
          </div>
        </div>
        <div className="w-full mt-7 grid grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
          <div className="px-3 py-4 sm:px-5">
            <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
              Orders
            </p>
            <p className="mt-2 font-display text-[clamp(18px,2vw,24px)] font-bold text-white">
              {USER_INFO.orders}
            </p>
          </div>
          <div className="border-x border-white/10 px-3 py-4 sm:px-5">
            <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
              Wishlist
            </p>
            <p className="mt-2 font-display text-[clamp(18px,2vw,24px)] font-bold text-white">
              {USER_INFO.wishlist}
            </p>
          </div>
          <div className="px-3 py-4 sm:px-5">
            <p className="text-[9px] uppercase tracking-ultra text-white/40 sm:text-[10px]">
              Loyalty Points
            </p>
            <p className="mt-2 font-display text-[clamp(18px,2vw,24px)] font-bold text-gradient-blue">
              {USER_INFO.points}
            </p>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-start lg:flex-col lg:items-end">
        <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] uppercase tracking-ultra text-emerald-300">
          <ShieldCheck size={14} />
          Verified Member
        </span>
      </div>
    </section>
  );
};
