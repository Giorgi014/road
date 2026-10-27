import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

export interface DataProviderProps {
  children: ReactNode;
}

export interface AuthModalProps {
  onClose: () => void;
}

export interface SiteHeaderProps {
  variant?: "overlay" | "solid";
}

export interface NavigationProps {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export interface MenuSidebarProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FooterFormProps {
  submit: (event: FormEvent<HTMLFormElement>) => void;
  email: string;
  sent: boolean;
  setEmail: (value: string) => void;
}
