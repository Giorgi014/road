import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib";

type RevealProperties = Omit<
  gsap.TweenVars,
  "clearProps" | "delay" | "duration" | "ease" | "scrollTrigger" | "stagger"
>;

type ScrollRevealOptions<T extends HTMLElement> = {
  target?: (scope: T) => gsap.TweenTarget;
  trigger?: (scope: T) => HTMLElement | null;
  from?: RevealProperties;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
};

export function useScrollReveal<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  {
    target,
    trigger,
    from = { y: 30, opacity: 0 },
    duration = 1.1,
    delay = 0,
    stagger,
    ease = "power4.out",
    start = "top 85%",
  }: ScrollRevealOptions<T> = {},
) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      const targets = target?.(scope) ?? scope;
      if (!targets || (Array.isArray(targets) && targets.length === 0)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(targets, {
        ...from,
        duration,
        delay,
        stagger,
        ease,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: trigger?.(scope) ?? scope,
          start,
          once: true,
        },
      });
    },
    { scope: scopeRef },
  );
}
