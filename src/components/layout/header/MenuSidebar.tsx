import { useState } from "react";
import { AuthModal } from "@/components/authorization";
import { CartContent } from "@/components/cart/CartContent";
import { Sidebar } from "@/components/layout/Sidebar";
import type { MenuSidebarProps } from "@/types";
import { MenuContent } from "./MenuContent";

export const MenuSidebar = ({ view, isOpen, onClose }: MenuSidebarProps) => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Sidebar
        title={view === "cart" ? "Your Cart" : "ROAD"}
        isOpen={isOpen}
        onClose={onClose}
      >
        {view === "cart" ? (
          <CartContent />
        ) : (
          <MenuContent
            onClose={onClose}
            onRequestAuth={() => setAuthOpen(true)}
          />
        )}
      </Sidebar>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
};
