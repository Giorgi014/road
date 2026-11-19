import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export default function HeroVignette() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-road-line]");

      gsap.set(lines, { yPercent: 110, opacity: 0 });
      gsap.set(titleRef.current, { "--stroke-alpha": 0.15 });

      gsap
        .timeline({ delay: 0.3, defaults: { ease: "power4.out" } })
        .to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.14,
        })
        .to(
          titleRef.current,
          { "--stroke-alpha": 1, duration: 1.2, ease: "power2.inOut" },
          "<0.2",
        )
        .fromTo(
          titleRef.current,
          { filter: "drop-shadow(0 0 0px rgba(49,85,255,0))" },
          {
            filter: "drop-shadow(0 0 18px rgba(49,85,255,0.45))",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          "-=0.4",
        );
    },
    { scope: titleRef },
  );
  return (
    <section>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgba(3,8,23,0.4)_70%,rgba(3,8,23,0.85)_100%),linear-gradient(to_top,rgba(3,8,23,0.7)_0%,transparent_30%),linear-gradient(to_right,rgba(3,8,23,0.55)_0%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(49,85,255,0.025)_2px,rgba(49,85,255,0.025)_3px)]" />
      <h2
        ref={titleRef}
        className="pointer-events-none absolute right-8 sm:right-16 lg:right-24 top-1/2 z-10 -translate-y-1/2 flex select-none flex-col items-start font-display text-[clamp(10rem,28vw,17rem)] font-light leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgb(from_var(--color-electric-500)_r_g_b_/_var(--stroke-alpha,1))]"
      >
        <span className="flex overflow-hidden">
          <span data-road-line className="block">
            R
          </span>
          <span data-road-line className="block">
            O
          </span>
        </span>
        <span className="block overflow-hidden pl-[0.80em]">
          <span data-road-line className="block">
            A
          </span>
        </span>
        <span className="block overflow-hidden pl-[0.80em]">
          <span data-road-line className="block">
            D
          </span>
        </span>
      </h2>
    </section>
  );
}
