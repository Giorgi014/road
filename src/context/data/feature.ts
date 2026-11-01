import { Lightbulb, X, Hexagon, Users } from "lucide-react";
import type { FeatureItem } from "@/types";

export const BRAND_FEATURES: FeatureItem[] = [
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Pushing the boundaries of materials, design and technology to build the next generation.",
    icon: Lightbulb,
  },
  {
    id: "functionality",
    title: "Functionality",
    description:
      "Engineered for movement and adaptability in every environment.",
    icon: X,
  },
  {
    id: "aesthetics",
    title: "Aesthetics",
    description:
      "Clean lines, bold details and cyber inspired visuals that stand out.",
    icon: Hexagon,
  },
  {
    id: "community",
    title: "Community",
    description:
      "More than a brand — we're a global community united by style and vision.",
    icon: Users,
  },
];
