import type { LucideIcon } from "lucide-react";
import type { FormEvent, ReactNode } from "react";

export type AccountSidebarLink = {
	id: number;
	label: string;
	href: string;
	icon: LucideIcon;
	action?: "log-out";
};

export interface DataProviderProps {
	children: ReactNode;
}

export interface AuthModalProps {
	onClose: () => void;
	onSuccess?: () => void;
}

export interface SiteHeaderProps {
	variant?: "overlay" | "solid";
}

export interface NavigationProps {
	openSidebar: (view: "menu" | "cart") => void;
}

export interface MenuSidebarProps {
	view: "menu" | "cart";
	isOpen: boolean;
	onClose: () => void;
}

export interface SidebarProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title: string;
}

export interface FooterFormProps {
	submit: (event: FormEvent<HTMLFormElement>) => void;
	email: string;
	sent: boolean;
	setEmail: (value: string) => void;
}
