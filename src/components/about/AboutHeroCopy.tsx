import { Button, Eyebrow } from "@/components/ui";
import { ABOUT_HERO_COPY } from "@/data";

interface AboutCopyProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  copyRef: React.RefObject<HTMLDivElement | null>;
}

export const AboutHeroCopy = ({ titleRef, copyRef }: AboutCopyProps) => {
  return (
    <div className="z-20 max-w-155 pointer-events-auto" ref={copyRef}>
      <Eyebrow text={ABOUT_HERO_COPY.eyebrow} />
      <h2
        ref={titleRef}
        className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
      >
        <span className="block">{ABOUT_HERO_COPY.titleTop}</span>
        <span className="text-gradient-blue">
          {ABOUT_HERO_COPY.titleBottom}
        </span>
      </h2>
      <p className="mt-8 max-w-105 text-base leading-7 text-(--ink-dim)">
        {ABOUT_HERO_COPY.paragraph}
      </p>
      <div className="mt-10">
        <Button href="#explore" label={ABOUT_HERO_COPY.cta} />
      </div>
    </div>
  );
};
