import { Link } from "react-router-dom";
import { useAuth } from "@/context";
import { SIDEBAR_LINKS } from "@/data";

export const MenuContent = ({
  onClose,
  onRequestAuth,
}: {
  onClose: () => void;
  onRequestAuth: () => void;
}) => {
  const { user, logout } = useAuth();

  const links = SIDEBAR_LINKS.filter((link) => {
    if (link.action === "auth") return !user;
    if (link.action === "log-out") return !!user;
    return true;
  });

  return (
    <div className="flex flex-1 flex-col">
      <ul className="m-0 list-none p-0">
        {links.map((link, index) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="flex items-center gap-4 border-b border-white/5 py-4 text-white/80 no-underline transition-all hover:translate-x-2 hover:text-white"
              onClick={(event) => {
                if (link.action === "auth") {
                  event.preventDefault();
                  onRequestAuth();
                  return;
                }
                if (link.action === "log-out") logout();
                onClose();
              }}
            >
              <span className="font-sans text-[12px] text-(--ink-dim)">
                0{index + 1}
              </span>
              <span className="font-display text-[30px] font-medium text-white">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-white/40">
          Future Techwear
        </p>
        <p className="text-sm text-white/50">
          Engineered for explorers. Built for the next century.
        </p>
      </div>
    </div>
  );
};
