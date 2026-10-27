import { useRef } from "react";
import { useCinematicScroll } from "@/hooks";
import type { HeroSectionProps } from "@/types";
import HeroVideo from "./HeroVideo";
import HeroVignette from "./HeroVignette";
import { HeroCopy } from "./HeroCopy";

export const HeroSection = ({
  copy,
  media,
  id,
  ariaLabel,
  className = "",
  secondaryLink,
  showScrollIndicator = false,
}: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useCinematicScroll({ sectionRef, videoRef, titleRef, copyRef, headerRef });

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={ariaLabel}
      className={`relative h-screen w-full overflow-hidden bg-ink-900 ${className}`}
    >
      <div className="absolute inset-0 h-full w-full">
        {media.type === "video" ? (
          <HeroVideo ref={videoRef} src={media.src} />
        ) : (
          <img
            src={media.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        )}
        <HeroVignette />
        <HeroCopy
          copy={copy}
          titleRef={titleRef}
          copyRef={copyRef}
          secondaryLink={secondaryLink}
        />
      </div>
      {showScrollIndicator && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-ultra">Scroll</span>
          <span className="h-10 w-px bg-linear-to-b from-electric-400 to-transparent" />
        </div>
      )}
    </section>
  );
};
