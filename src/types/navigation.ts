export interface NavLink {
  label: string;
  href: string;
}

export interface SidebarLink {
  label: string;
  href: string;
  action?: "auth";
}
