import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
	id: string;
	title: string;
	description: string;
	icon: LucideIcon;
}

export interface FeatureCardsProps {
	className?: string;
}
