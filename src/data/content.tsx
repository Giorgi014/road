import { Cpu, Hand, ShieldCheck, Bitcoin } from "lucide-react";
import type {
  AllCategories,
  FeatureItem,
  NavLink,
  Product,
  Sizes,
} from "../types";

export const NAV_LINKS: NavLink[] = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

export const HERO_COPY = {
  eyebrow: "Welcome to Road",
  titleTop: "FUTURE",
  titleBottom: "TECHWEAR",
  paragraph:
    "Garments engineered for the next century — intelligent fabrics, interactive weaves, and blockchain-verified authenticity.",
  cta: "Explore Collection",
  learn: "Learn More",
};

export const MISSION = {
  eyebrow: "Our Mission",
  titleTop: "Built for explorers.",
  titleBottom: "Made for the future.",
  paragraph:
    "We believe clothing should work as hard as the people wearing it. Every ROAD piece is field-tested, lab-verified, and built to outlast trends — and seasons. This is gear for the unknown.",
  cta: "Join the Road",
};

export const STATS = [
  { k: "12K+", v: "Explorers equipped" },
  { k: "48", v: "Lab-tested fabrics" },
  { k: "100%", v: "Blockchain verified" },
  { k: "2031", v: "Design horizon" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 0,
    label: "Jackets",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/8108297/pexels-photo-8108297.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 1,
    label: "Backpacks",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/16359250/pexels-photo-16359250.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    label: "Boots",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/33937416/pexels-photo-33937416.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    label: "Full Fit",
    href: "#",
    imageSrc:
      "https://images.pexels.com/photos/8108387/pexels-photo-8108387.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
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

export const FOOTER = {
  headlineTop: "Don't be shy.",
  headlineBottom: "Talk to us.",
  contacts: [
    { label: "hello@road.tech" },
    { label: "+1 (415) 555-0192" },
    { label: "Neo District, Tokyo / SF" },
  ],
  legal: ["Privacy", "Terms", "Cookies", "Imprint"],
};

export const PORTAL_IMAGE =
  "https://images.pexels.com/photos/20434858/pexels-photo-20434858.jpeg?auto=compress&cs=tinysrgb&w=900";

export const MODEL_IMAGE =
  "https://images.pexels.com/photos/9781909/pexels-photo-9781909.jpeg?auto=compress&cs=tinysrgb&w=900";

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
