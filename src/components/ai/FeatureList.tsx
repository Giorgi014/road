import { FEATURE_ITEMS } from "../../data/content";

export default function FeatureList() {
  return (
    <div className="flex flex-col gap-4">
      {FEATURE_ITEMS.map((f, i) => (
        <div
          key={f.id}
          className="feature-item flex items-start gap-4 rounded-2xl border border-ink-400 bg-ink-700/70 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-electric-500 hover:bg-ink-600/70"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-electric-400/30 bg-gradient-to-br from-electric-500/20 to-electric-600/20 text-electric-300 transition-shadow duration-300 hover:shadow-[0_0_40px_-10px_var(--blue-glow)]">
            {f.icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] text-(--ink-dim)">
                0{i + 1}
              </span>
              <h3 className="font-display text-base font-semibold text-white">
                {f.title}
              </h3>
            </div>
            <p className="mt-1 text-sm leading-6 text-white/45">
              {f.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
