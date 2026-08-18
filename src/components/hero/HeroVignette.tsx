export default function HeroVignette() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgba(5,7,15,0.4)_70%,rgba(5,7,15,0.85)_100%),linear-gradient(to_top,rgba(5,7,15,0.7)_0%,transparent_30%),linear-gradient(to_right,rgba(5,7,15,0.55)_0%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(77,110,255,0.025)_2px,rgba(77,110,255,0.025)_3px)]" />
      <h2
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(12rem,28vw,30rem)] font-bold leading-none tracking-[-0.04em] text-white/5"
      >
        ROAD
      </h2>
    </>
  );
}
