import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { MISSION, STATS } from "../../data/content";
import Eyebrow from "../ui/Eyebrow";
import { Button } from "../ui/Button";

export const MissionBlurb = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      if (reduceMotion.matches) return;

      const stats = statsRef.current?.querySelectorAll(".mission-stat");
      if (stats) {
        gsap.from(stats, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        });
      }

      const headline = sectionRef.current?.querySelector(".mission-headline");
      if (headline) {
        gsap.from(headline, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }
    },
    { scope: sectionRef as React.RefObject<HTMLElement> },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="max-w-[1600px] mx-auto relative overflow-hidden bg-ink-700 py-15"
    >
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full bg-electric-500/15 blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <Eyebrow text={MISSION.eyebrow} />
            <h2 className="mission-headline font-display text-[clamp(32px,7vw,80px)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
              <span className="block">{MISSION.titleTop}</span>
              <span className="text-gradient-blue">{MISSION.titleBottom}</span>
            </h2>
          </div>
          <div className="lg:pl-8">
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
          {STATS.map((s) => (
            <div key={s.v} className="mission-stat bg-ink-700 p-6 md:p-8">
              <p className="font-display text-[26px] font-bold text-gradient-blue md:text-[clamp(26px,4.5vw,40px)]">
                {s.k}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/40">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
