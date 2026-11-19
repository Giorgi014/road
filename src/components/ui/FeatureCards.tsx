import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { BRAND_FEATURES } from "@/data";
import { gsap } from "@/lib";
import type { FeatureCardsProps } from "@/types";

export const FeatureCards = ({ className = "" }: FeatureCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const cards = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (!container || !cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 641px)", () => {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: "power4.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      mm.add("(max-width: 640px)", () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ${className}`}
    >
      {BRAND_FEATURES.map(({ id, title, description, icon: Icon }, i) => (
        <div
          key={id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
        >
          <div className="group relative grid h-full grid-cols-[auto_1fr] gap-x-5 gap-y-4 rounded-2xl border border-ink-400/70 bg-ink-800/60 p-6 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-electric-500/60 hover:shadow-[0_0_40px_-10px_rgba(49,85,255,0.6)]">
            <div className="row-span-1 flex size-14 items-center justify-center rounded-xl border border-electric-500/60 bg-electric-500/10 text-electric-500 transition-colors duration-300 group-hover:bg-electric-500/20 group-hover:text-electric-400">
              <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="min-w-0 self-center wrap-break-word font-display text-lg uppercase leading-tight tracking-wider text-(--ink)">
              {title}
            </h3>
            <p className="col-start-2 min-w-0 wrap-break-word text-sm leading-7 text-(--ink-dim)/70">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
