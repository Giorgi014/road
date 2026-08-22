import { FEATURE_ITEMS } from "../../data/content";

export default function FeatureList() {
  return (
    <div className="flex flex-col gap-4">
      {FEATURE_ITEMS.map((f, i) => (
        <div
          key={f.id}
          className="feature-item flex items-start gap-4 rounded-2xl border border-[#1b2d72] bg-[#0b1745]/70 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#3155ff] hover:bg-[#101f66]/70"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#4267ff]/30 bg-[linear-gradient(135deg,rgba(49,85,255,0.2),rgba(104,71,255,0.2))] text-[#00a8ff] transition-shadow duration-300 hover:shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)]">
            {f.icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] text-[#7d89ad]">
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
