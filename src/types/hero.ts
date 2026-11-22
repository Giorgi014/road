import type { RefObject } from "react";

export interface HeroCopyContent {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  paragraph: string;
  cta: string;
  learn?: string;
}

export interface HomeHeroCopyContent extends HeroCopyContent {
  learn: string;
}

export type HeroMedia =
  | { type: "video"; src: string }
  | { type: "image"; src: string };

export interface HeroSecondaryLink {
  to: string;
  label: string;
}

export interface HeroCopyProps {
  copy: HeroCopyContent;
  titleRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
  secondaryLink?: HeroSecondaryLink;
}

export interface HeroSectionProps {
  copy: HeroCopyContent;
  media: HeroMedia;
  id?: string;
  ariaLabel?: string;
  className?: string;
  secondaryLink?: HeroSecondaryLink;
  showScrollIndicator?: boolean;
}

export interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
}
