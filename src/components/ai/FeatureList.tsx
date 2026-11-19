import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FEATURE_ITEMS } from "@/data";
import { gsap } from "@/lib";

export default function FeatureList() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const fromLeft = i % 2 === 0;

      gsap.from(el, {
        x: fromLeft ? -80 : 80,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    });
  });

  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      {FEATURE_ITEMS.map((f, i) => (
        <div
          key={f.id}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="flex items-start gap-4 rounded-2xl border border-ink-400 bg-ink-700/70 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-electric-500 hover:bg-ink-600/70"
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
