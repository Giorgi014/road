import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import AiPortal from "./AiPortal";
import FeatureList from "./FeatureList";
import Eyebrow from "../ui/Eyebrow";
import { MODEL_IMAGE } from "../../data/content";

const MODEL_PARTICLES = [0, 1, 2, 3, 4];

export default function AiFeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      if (reduceMotion.matches) return;

      const items = sectionRef.current?.querySelectorAll(".feature-item");
      if (items) {
        gsap.from(items, {
          x: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      const portal = sectionRef.current?.querySelector(".ai-portal");
      if (portal) {
        gsap.from(portal, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

      const model = sectionRef.current?.querySelector(".ai-model");
      if (model) {
        gsap.from(model, {
          x: -30,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }
    },
    { scope: sectionRef as React.RefObject<HTMLElement> },
  );

  return (
    <section
      id="resources"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0e27] py-[96px]"
    >
      <div className="pointer-events-none absolute left-[25%] top-[25%] h-[500px] w-[500px] rounded-full bg-[#3b5bff]/[0.15] blur-[130px]" />
      <div className="relative mx-auto max-w-[1600px] px-6">
        <div className="mb-16 text-center">
          <Eyebrow text="AI / Technology" center />
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.02em] text-white">
            Engineered <span className="text-gradient-blue">Intelligence</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr_0.8fr]">
          <AiPortal />
          <FeatureList />
          <div className="ai-model relative min-h-[440px] overflow-hidden rounded-[24px] border border-white/10 bg-[#05070f]">
            <img
              src={MODEL_IMAGE}
              alt="Model with tech goggles and cybernetic details"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,#05070f,transparent,rgba(77,110,255,0.1))] shadow-[inset_0_0_100px_rgba(5,7,15,0.85)]" />
            {MODEL_PARTICLES.map((i) => (
              <span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[#7f96ff] shadow-[0_0_8px_rgba(125,146,255,0.9)] animate-[float_6s_ease-in-out_infinite]"
                style={{
                  top: `${30 + ((i * 11) % 50)}%`,
                  left: `${20 + ((i * 19) % 60)}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
            <div className="absolute inset-x-5 bottom-5">
              <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-[#7d92ff]/80">
                Cybernetic Series
              </p>
              <p className="font-display text-[18px] font-semibold text-white">
                Vision Unit 02
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
