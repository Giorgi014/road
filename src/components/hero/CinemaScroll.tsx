import { useRef } from "react";
import { useCinematicScroll } from "../../hooks/useCinematicScroll";
import HeroVideo from "./HeroVideo";
import HeroVignette from "./HeroVignette";
import HeroCopy from "./HeroCopy";
import VideoHero from "@/assets/hero.mp4";

export default function CinemaScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useCinematicScroll({ sectionRef, videoRef, titleRef, copyRef, headerRef });

  return (
    <section
      ref={sectionRef}
      id="cinema"
      className="relative h-screen w-full overflow-hidden bg-[#030817]"
      aria-label="ROAD cinematic intro"
    >
      <div className="absolute inset-0 h-full w-full">
        <HeroVideo ref={videoRef} src={VideoHero} />
        <HeroVignette />
        <HeroCopy titleRef={titleRef} copyRef={copyRef} />
      </div>
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-[#4267ff] to-transparent" />
      </div>
    </section>
  );
}
