import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  label: string;
  imageSrc: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}
