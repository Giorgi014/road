import { Cpu, Hand, ShieldCheck, Bitcoin } from "lucide-react";
import type {
  AllCategories,
  ContactPage,
  FeatureItem,
  HeroCopyContent,
  HomeHeroCopyContent,
  FooterContent,
  NavLink,
  SidebarLink,
  Sizes,
  Stat,
  OptionsType,
} from "@/types";

export const CONTACT_PAGE: ContactPage = {
  eyebrow: "Lets Connect",
  headlineTop: "we're here",
  headlineBottom: "to connect",
  paragraph:
    "Have a question, collaboration idea or just want to say hi? Fill out the form and our team will get back to you as soon as possible. Let's build the future together.",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SIDEBAR_LINKS: SidebarLink[] = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Authorization", href: "#", action: "auth" },
];

export const HERO_COPY: HomeHeroCopyContent = {
  eyebrow: "Welcome to Road",
  titleTop: "FUTURE",
  titleBottom: "TECHWEAR",
  paragraph:
    "Garments engineered for the next century — intelligent fabrics, interactive weaves, and blockchain-verified authenticity.",
  cta: "Explore Collection",
  learn: "Learn More",
};

export const ABOUT_HERO_COPY: HeroCopyContent = {
  eyebrow: "ABOUT US",
  titleTop: "REDEFINING",
  titleBottom: "THE FUTURE",
  paragraph:
    "ROAD is a next-generation techwear brand built at the intersection of cyber culture, functionality and futuristic aesthetics. We design apparel and gear for the digital generation — made to move, built to last, and created to stand out in any environment.",
  cta: "Explore Collection",
};

export const MISSION: HeroCopyContent = {
  eyebrow: "Our Mission",
  titleTop: "Built for explorers.",
  titleBottom: "Made for the future.",
  paragraph:
    "We believe clothing should work as hard as the people wearing it. Every ROAD piece is field-tested, lab-verified, and built to outlast trends — and seasons. This is gear for the unknown.",
  cta: "Join the Road",
};

export const STATS: Stat[] = [
  { k: "12K+", v: "Explorers equipped" },
  { k: "48", v: "Lab-tested fabrics" },
  { k: "100%", v: "Blockchain verified" },
  { k: "2026", v: "Design horizon" },
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "fabrics",
    icon: <Cpu size={20} strokeWidth={1.8} />,
    title: "Intelligent Fabrics",
    description: "Adaptive thermal regulation woven at the fiber level.",
  },
  {
    id: "interactive",
    icon: <Hand size={20} strokeWidth={1.8} />,
    title: "Interactive Wear",
    description: "Gesture-reactive surfaces that respond to touch and motion.",
  },
  {
    id: "blockchain",
    icon: <ShieldCheck size={20} strokeWidth={1.8} />,
    title: "Blockchain Verified",
    description: "Every piece cryptographically authenticated on-chain.",
  },
  {
    id: "crypto",
    icon: <Bitcoin size={20} strokeWidth={1.8} />,
    title: "Crypto Payments",
    description: "Pay with BTC, ETH, or stablecoins at checkout.",
  },
];

export const FOOTER: FooterContent = {
  headlineTop: "Don't be shy.",
  headlineBottom: "Talk to us.",
  contacts: [
    { label: "hello@road.tech" },
    { label: "+1 (415) 555-0192" },
    { label: "Neo District, Tokyo / SF" },
  ],
  legal: ["Privacy", "Terms", "Cookies", "Imprint"],
};

export const ALL_CATEGORIES: AllCategories[] = [
  {
    id: 0,
    category: "all",
  },
  {
    id: 1,
    category: "jackets",
  },
  {
    id: 2,
    category: "hoodies",
  },
  {
    id: 3,
    category: "boots",
  },
  {
    id: 4,
    category: "pants",
  },
  {
    id: 5,
    category: "masks",
  },
  {
    id: 6,
    category: "vests",
  },
  {
    id: 7,
    category: "backpacks",
  },
  {
    id: 8,
    category: "bags",
  },
  {
    id: 9,
    category: "gloves",
  },
  {
    id: 10,
    category: "headphones",
  },
  {
    id: 11,
    category: "caps",
  },
  {
    id: 12,
    category: "goggles",
  },
  {
    id: 13,
    category: "helmets",
  },
  {
    id: 14,
    category: "smartwatches",
  },
  {
    id: 15,
    category: "necklaces",
  },
  {
    id: 16,
    category: "sunglasses",
  },
];

export const SIZES: Sizes[] = [
  {
    id: 0,
    size: "S",
  },
  {
    id: 1,
    size: "M",
  },
  {
    id: 2,
    size: "L",
  },
  {
    id: 3,
    size: "XL",
  },
];

export const OPTIONS: OptionsType[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "price-desc",
    label: "Price: decreasing",
  },
  {
    value: "price-asc",
    label: "Price: increasing",
  },
  {
    value: "name-asc",
    label: "Name: A-Z",
  },
  {
    value: "name-desc",
    label: "Name: Z-A",
  },
];
