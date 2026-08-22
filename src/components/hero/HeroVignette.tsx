export default function HeroVignette() {
  return (
    <section>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgba(3,8,23,0.4)_70%,rgba(3,8,23,0.85)_100%),linear-gradient(to_top,rgba(3,8,23,0.7)_0%,transparent_30%),linear-gradient(to_right,rgba(3,8,23,0.55)_0%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(49,85,255,0.025)_2px,rgba(49,85,255,0.025)_3px)]" />
      <h2 className="pointer-events-none absolute right-8 sm:right-16 lg:right-24 top-1/2 z-10 -translate-y-1/2 flex select-none flex-col items-start font-display text-[clamp(10rem,28vw,17rem)] font-light leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--color-electric-500)]">
        <span>RO</span>
        <span className="pl-[0.80em]">A</span>
        <span className="pl-[0.80em]">D</span>
      </h2>
    </section>
  );
}
