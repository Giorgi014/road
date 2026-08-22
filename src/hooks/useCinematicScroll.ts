import { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

interface Options {
  sectionRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  copyRef: React.RefObject<HTMLDivElement | null>;
  headerRef: React.RefObject<HTMLElement | null>;
  scrubEndPx?: number;
}

export function useCinematicScroll({
  sectionRef,
  videoRef,
  titleRef,
  copyRef,
  headerRef,
  scrubEndPx = 2500,
}: Options) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      video.pause();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (reduceMotion.matches) {
        video.currentTime = 0;
        gsap.set([headerRef.current, titleRef.current, copyRef.current], {
          clearProps: "all",
        });
        return;
      }

      const buildTimeline = () => {
        const duration = video.duration || 8;
        const proxy = { t: 0 };

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrubEndPx}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            proxy.t = self.progress * duration;
            if (video.readyState >= 2) {
              video.currentTime = proxy.t;
            }
          },
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrubEndPx}`,
            scrub: 0.6,
          },
        });

        tl.to(headerRef.current, { opacity: 0, ease: "power1.out" }, 0.55)
          .to(
            titleRef.current,
            { y: -120, scale: 0.94, opacity: 0, ease: "power2.out" },
            0.3,
          )
          .to(copyRef.current, { y: 60, opacity: 0, ease: "power2.out" }, 0.3);

        cleanupRef.current = () => {
          st.kill();
          tl.kill();
          tl.scrollTrigger?.kill();
        };
      };

      buildTimeline();
    },
    { scope: sectionRef as React.RefObject<HTMLElement> },
  );

  useLayoutEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);
}
