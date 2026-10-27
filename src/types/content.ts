import type { ReactNode } from "react";

export interface ContactPage {
  eyebrow: string;
  headlineTop: string;
  headlineBottom: string;
  paragraph: string;
}

export interface FeatureItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Stat {
  k: string;
  v: string;
}

export interface FooterContact {
  label: string;
}

export interface FooterContent {
  headlineTop: string;
  headlineBottom: string;
  contacts: FooterContact[];
  legal: string[];
}
