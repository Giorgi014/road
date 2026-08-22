import { PORTAL_IMAGE } from "../../data/content";

const PARTICLES = [0, 1, 2, 3, 4, 5];

export default function AiPortal() {
  return (
    <div className="ai-portal relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[24px] border border-[#1b2d72] bg-[#030817]">
      <div className="absolute h-[340px] w-[340px] rounded-full border border-[#4267ff]/20 animate-[spinSlow_24s_linear_infinite]" />
      <div className="absolute h-[260px] w-[260px] rounded-full border border-[#00a8ff]/15 animate-[spinSlow_18s_linear_infinite_reverse]" />
      <div className="absolute h-[280px] w-[280px] rounded-full bg-[#3155ff]/30 blur-[80px] animate-[glowPulse_4s_ease-in-out_infinite]" />
      <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-2 border-[#4267ff]/40 shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)]">
        <img
          src={PORTAL_IMAGE}
          alt="Futuristic portal figure"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(56,38,168,0.4),transparent,rgba(0,168,255,0.2))] mix-blend-screen" />
      </div>
      {PARTICLES.map((i) => (
        <span
          key={i}
          className="absolute h-[6px] w-[6px] rounded-full bg-[#00a8ff] shadow-[0_0_8px_rgba(0,168,255,0.9)] animate-[float_6s_ease-in-out_infinite]"
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
