import { PORTAL_IMAGE } from "../../data/content";

const PARTICLES = [0, 1, 2, 3, 4, 5];

export default function AiPortal() {
  return (
    <div className="ai-portal relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-3xl border border-ink-400 bg-ink-900">
      <div className="absolute h-[340px] w-[340px] rounded-full border border-electric-400/20 animate-[spinSlow_24s_linear_infinite]" />
      <div className="absolute h-[260px] w-[260px] rounded-full border border-electric-300/15 animate-[spinSlow_18s_linear_infinite_reverse]" />
      <div className="absolute h-[280px] w-[280px] rounded-full bg-electric-500/30 blur-[80px] animate-[glowPulse_4s_ease-in-out_infinite]" />
      <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-2 border-electric-400/40 shadow-[0_0_40px_-10px_var(--blue-glow)]">
        <img
          src={PORTAL_IMAGE}
          alt="Futuristic portal figure"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--violet-dark)_40%,transparent),transparent,color-mix(in_srgb,var(--cyan)_20%,transparent))] mix-blend-screen" />
      </div>
      {PARTICLES.map((i) => (
        <span
          key={i}
          className="absolute h-[6px] w-[6px] rounded-full bg-electric-300 shadow-[0_0_8px_var(--cyan)] animate-[float_6s_ease-in-out_infinite]"
          style={{
            top: `${20 + ((i * 13) % 60)}%`,
            left: `${15 + ((i * 17) % 70)}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
}
