import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { MISSION, STATS } from "@/data";
import { useScrollReveal } from "@/hooks";
import { gsap } from "@/lib";

export const MissionBlurb = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useScrollReveal(headlineRef, {
    target: (headline) => Array.from(headline.children),
    from: { xPercent: -40, opacity: 0 },
    stagger: 0.2,
  });
  useScrollReveal(sideRef, {
    target: (side) => Array.from(side.children),
    from: { x: 80, opacity: 0 },
    stagger: 0.25,
  });
  useScrollReveal(statsRef, {
    target: () =>
      cardRefs.current.filter((card): card is HTMLDivElement => card !== null),
    from: { y: 30, opacity: 0 },
    stagger: 0.1,
    duration: 0.7,
    ease: "power2.out",
  });

  useGSAP(() => {
    STATS.forEach((stat, i) => {
      const el = countRefs.current[i];
      if (!el || stat.value > 1000) return;

      const counter = { value: 0 };

      gsap.to(counter, {
        value: stat.value,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${stat.suffix ?? ""}`;
        },
      });
    });
  });

  return (
    <article
      id="about"
      className="max-w-[1600px] mx-auto relative overflow-hidden bg-ink-700 py-15"
    >
      <div className="pointer-events-none absolute -bottom-40 right-0 h-150 w-150 rounded-full bg-electric-500/15 blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <Eyebrow text={MISSION.eyebrow} />
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(32px,7vw,80px)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
            >
              <span className="block">{MISSION.titleTop}</span>
              <span className="block text-gradient-blue">
                {MISSION.titleBottom}
              </span>
            </h2>
          </div>
          <div ref={sideRef} className="lg:pl-8">
            <p className="mb-8 max-w-120 text-base leading-7 text-(--ink-dim)">
              {MISSION.paragraph}
            </p>
            <Button href="#explore" label={MISSION.cta} />
          </div>
        </div>
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-ink-700 p-6 md:p-8"
            >
              <p
                ref={(el) => {
                  countRefs.current[i] = el;
                }}
                className="font-display text-[26px] font-bold text-gradient-blue md:text-[clamp(26px,4.5vw,40px)]"
              >
                {s.value > 1000 ? s.value : 0}
                {s.suffix}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
