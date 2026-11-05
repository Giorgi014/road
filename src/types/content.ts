import type { ReactNode } from "react";

export interface ContactPage {
  eyebrow: string;
  headlineTop: string;
  headlineBottom: string;
  paragraph: string;
}

export interface ContentFeatureItem {
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

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  number: number;
  location: {
    city: string;
    country: string;
  };
  rank: string;
  level: number;
  month: string;
  year: number;
  orders: number;
  wishlist: number;
  points: number;
}
