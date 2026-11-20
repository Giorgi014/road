import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { JOURNEY_TIMELINE } from "@/data";
import { useScrollReveal } from "@/hooks";
import { gsap } from "@/lib";
import type { TimelineProps } from "@/types";

export const Timeline = ({ className = "" }: TimelineProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const mobileLineRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollReveal(titleRef, {
    from: { y: 50, opacity: 0 },
  });

  useGSAP(
    () => {
      const list = listRef.current;
      const line = lineRef.current;
      const mobileLine = mobileLineRef.current;
      if (!list || !line || !mobileLine) return;

      const items = itemRefs.current;
      const dots = dotRefs.current;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const total = items.length;
        const lineDuration = 1.8;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          line,
          { scaleX: 0, transformOrigin: "right center" },
          { scaleX: 1, duration: lineDuration, ease: "none" },
          0,
        );

        items.forEach((item, i) => {
          const dot = dots[i];
          if (!item || !dot) return;

          const reachTime = lineDuration * (1 - i / total);

          tl.fromTo(
            item,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            reachTime,
          );

          tl.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.6,
              ease: "back.out(2)",
              clearProps: "transform",
            },
            reachTime,
          );
        });
      });

      mm.add("(max-width: 768px)", () => {
        const listHeight = list.offsetHeight;
        const scrubDuration = 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        });

        tl.fromTo(
          mobileLine,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: scrubDuration, ease: "none" },
          0,
        );

        items.forEach((item, i) => {
          const dot = dots[i];
          if (!item || !dot) return;

          const reachTime = (item.offsetTop / listHeight) * scrubDuration;

          tl.fromTo(
            item,
            { opacity: 0 },
            { opacity: 1, duration: 0.08, ease: "none" },
            reachTime,
          );

          tl.fromTo(
            dot,
            { scale: 0 },
            { scale: 1, duration: 0.05, ease: "back.out(2)" },
            reachTime,
          );
        });
      });
    },
    { scope: listRef },
  );

  return (
    <section
      className={`relative rounded-2xl border border-ink-400/40 bg-ink-900/60 mt-10 px-6 py-6 sm:px-8 ${className}`}
    >
      <div ref={titleRef} className="mb-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-2.5 rotate-45 border border-electric-500/70"
        />
        <h2 className="text-sm uppercase tracking-widest text-electric-500">
          Our Journey
        </h2>
      </div>

      <ol
        ref={listRef}
        className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6"
      >
        <span
          ref={lineRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-1.75 hidden h-px bg-linear-to-r from-electric-500/80 via-electric-500/40 to-transparent md:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1.75 top-0 w-px bg-ink-400/30 md:hidden"
        />
        <span
          ref={mobileLineRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1.75 top-0 w-px bg-linear-to-b from-electric-500/80 to-electric-500/40 md:hidden"
        />
        {JOURNEY_TIMELINE.map(({ id, year, title, description }, i) => (
          <li
            key={id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative pl-8 md:pl-0 md:pt-8"
          >
            <span
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute left-0 top-0 flex size-3.75 items-center justify-center rounded-full bg-electric-500/25 shadow-[0_0_16px_2px_rgba(104,71,255,0.55)]"
            >
              <span className="size-1.75 rounded-full bg-electric-500" />
            </span>

            <p className="text-lg text-electric-500">{year}</p>
            <h3 className="mt-1 font-display text-base uppercase tracking-wider text-(--ink)">
              {title}
            </h3>
            <p className="mt-2 max-w-49.25 text-sm leading-6 text-(--ink-dim)/70">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};
