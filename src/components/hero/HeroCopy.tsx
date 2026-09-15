import { Button } from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import { HERO_COPY } from "../../data/content";
import { Link } from "react-router-dom";

interface HeroCopyProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  copyRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroCopy = ({ titleRef, copyRef }: HeroCopyProps) => {
  return (
    <div
      className="absolute bottom-[8%] left-[6%] z-20 max-w-[620px] pointer-events-auto"
      ref={copyRef}
    >
      <Eyebrow text={HERO_COPY.eyebrow} />
      <h2
        ref={titleRef}
        className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
      >
        <span className="block">{HERO_COPY.titleTop}</span>
        <span className="text-gradient-blue">{HERO_COPY.titleBottom}</span>
      </h2>
      <p className="mt-8 max-w-[420px] text-base leading-7 text-(--ink-dim)">
        {HERO_COPY.paragraph}
      </p>
      <div className="mt-10 flex items-center gap-5">
        <Button href="#explore" label={HERO_COPY.cta} />
        <Link
          to={"/about"}
          className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50 transition-colors hover:text-white"
        >
          Our Story
        </Link>
      </div>
    </div>
  );
};
