import { CartContent } from "@/components/cart/CartContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { useModal } from "@/context/modal";
import type { MenuSidebarProps } from "@/types";
import { MenuContent } from "./MenuContent";

export const MenuSidebar = ({ view, isOpen, onClose }: MenuSidebarProps) => {
  const { openAuth } = useModal();

  return (
    <>
      <Sidebar
        title={view === "cart" ? "Your Cart" : "ROAD"}
        isOpen={isOpen}
        onClose={onClose}
      >
        {view === "cart" ? (
          <CartContent onCheckout={onClose} />
        ) : (
          <MenuContent
            onClose={onClose}
            onRequestAuth={() => openAuth(onClose)}
          />
        )}
      </Sidebar>
    </>
  );
};
