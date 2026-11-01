import type { FeatureCardsProps } from "@/types";

export const FeatureCards = ({ items, className = "" }: FeatureCardsProps) => {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map(({ id, title, description, icon: Icon }) => (
        <div
          key={id}
          className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 rounded-2xl border border-ink-400/70 bg-ink-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-electric-500/60 hover:shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)]"
        >
          <div className="row-span-1 flex size-14 items-center justify-center rounded-xl border border-electric-600/60 bg-electric-600/10 text-electric-600 transition-colors duration-300 group-hover:bg-electric-600/20 group-hover:text-electric-400">
            <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h3 className="self-center font-display text-lg uppercase tracking-wider text-(--ink)">
            {title}
          </h3>
          <p className="col-start-2 text-sm leading-7 text-(--ink-dim)/70">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};
