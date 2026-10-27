import type { RefObject } from "react";

export interface UseCinematicScrollOptions {
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLElement | null>;
  scrubEndPx?: number;
}
