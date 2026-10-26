import { useCinematicScroll } from "@/hooks";
import { useRef } from "react";
import { AboutHeroCopy } from "./AboutHeroCopy";
import About_Cover from "@/assets/img/road-img.webp";

export const AboutHero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useCinematicScroll({ sectionRef, videoRef, titleRef, copyRef, headerRef });

  return (
    <article
      ref={sectionRef}
      className="w-full flex justify-between items-start relative"
    >
      <section className="w-full max-w-125">
        <AboutHeroCopy titleRef={titleRef} copyRef={copyRef} />
      </section>
      <img src={About_Cover} alt="" className="w-full max-w-125 rounded-3xl" />
    </article>
  );
};
