import type { FeatureCardsProps } from "@/types";
import { BRAND_FEATURES } from "@/data";

export const FeatureCards = ({ className = "" }: FeatureCardsProps) => {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ${className}`}
    >
      {BRAND_FEATURES.map(({ id, title, description, icon: Icon }) => (
        <div
          key={id}
          className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 rounded-2xl border border-ink-400/70 bg-ink-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-electric-500/60 hover:shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)]"
        >
          <div className="row-span-1 flex size-14 items-center justify-center rounded-xl border border-electric-500/60 bg-electric-500/10 text-electric-500 transition-colors duration-300 group-hover:bg-electric-500/20 group-hover:text-electric-400">
            <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h3 className="min-w-0 self-center wrap-break-word font-display text-lg uppercase leading-tight tracking-wider text-(--ink)">
            {title}
          </h3>
          <p className="col-start-2 min-w-0 wrap-break-word text-sm leading-7 text-(--ink-dim)/70">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};
