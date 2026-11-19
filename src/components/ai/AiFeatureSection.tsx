import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MODEL_IMAGE from "@/assets/img/model2.webp";
import { Eyebrow } from "@/components/ui";
import { gsap } from "@/lib";
import AiPortal from "./AiPortal";
import FeatureList from "./FeatureList";

const MODEL_PARTICLES = [0, 1, 2, 3, 4];

export const AiFeatureSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const title = titleRef.current;
    const portal = portalRef.current;
    const model = modelRef.current;
    if (!title || !portal || !model) return;

    gsap.from(title, {
      x: 80,
      opacity: 0,
      delay: 0.3,
      duration: 1.3,
      ease: "power4.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(portal, {
      x: 50,
      opacity: 0,
      duration: 1.3,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: portal,
        start: "top 90%",
        once: true,
      },
    });

    gsap.from(model, {
      x: -50,
      opacity: 0,
      duration: 1.3,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: model,
        start: "top 90%",
        once: true,
      },
    });
  });

  return (
    <article
      id="resources"
      className="relative overflow-hidden bg-ink-800 py-15"
    >
      <div className="pointer-events-none absolute left-[25%] top-[25%] h-125 w-125 rounded-full bg-electric-500/15 blur-[130px]" />
      <div className="relative mx-auto max-w-[1600px] px-6">
        <div className="mb-16 text-center">
          <Eyebrow text="AI / Technology" center />
          <h2
            ref={titleRef}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.02em] text-white"
          >
            Engineered <span className="text-gradient-blue">Intelligence</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr_0.8fr]">
          <div ref={portalRef} className="h-full">
            <AiPortal />
          </div>
          <div className="h-full">
            <FeatureList />
          </div>
          <div
            ref={modelRef}
            className="relative min-h-110 overflow-hidden rounded-3xl border border-ink-400 bg-ink-900"
          >
            <img
              src={MODEL_IMAGE}
              alt="Model with tech goggles and cybernetic details"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg-deep),transparent,color-mix(in_srgb,var(--primary-light)_10%,transparent))] shadow-[inset_0_0_100px_var(--bg-deep)]" />
            {MODEL_PARTICLES.map((i) => (
              <span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-electric-300 shadow-[0_0_8px_var(--cyan)] animate-float"
                style={{
                  top: `${30 + ((i * 11) % 50)}%`,
                  left: `${20 + ((i * 19) % 60)}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
            <div className="absolute inset-x-5 bottom-5">
              <p className="mb-1 text-[10px] uppercase tracking-ultra text-(--ink-dim)">
                Cybernetic Series
              </p>
              <p className="font-display text-[18px] font-semibold text-white">
                Vision Unit 02
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
