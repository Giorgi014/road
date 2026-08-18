import Pill from "../ui/Pill";
import Eyebrow from "../ui/Eyebrow";
import { HERO_COPY } from "../../data/content";

interface HeroCopyProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  copyRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroCopy({ titleRef, copyRef }: HeroCopyProps) {
  return (
    <div
      className="absolute bottom-[8%] left-[6%] z-20 max-w-[620px] pointer-events-auto"
      ref={copyRef}
    >
      <Eyebrow text={HERO_COPY.eyebrow} />
      <h1
        ref={titleRef}
        className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
      >
        <span className="block">{HERO_COPY.titleTop}</span>
        <span className="block text-gradient-blue">
          {HERO_COPY.titleBottom}
        </span>
      </h1>
      <p className="mt-8 max-w-[420px] text-base leading-7 text-[#a9b0d4]">
        {HERO_COPY.paragraph}
      </p>
      <div className="mt-10 flex items-center gap-5">
        <Pill href="#explore" label={HERO_COPY.cta} />
        <a
          href="#about"
          className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50 transition-colors hover:text-white"
        >
          Our Story
        </a>
      </div>
    </div>
  );
}
