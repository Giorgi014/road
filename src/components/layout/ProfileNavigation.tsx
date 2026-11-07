import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/context";
import { ACCOUNT_SIDEBAR_LINKS } from "@/data";

const linkBase =
  "relative flex shrink-0 items-center gap-4 whitespace-nowrap px-7 py-4 text-sm uppercase tracking-wider transition-colors duration-200 max-lg:gap-2 max-lg:px-4 max-lg:py-3";

export const ProfileNavigation = () => {
  const { logout } = useAuth();
  const mainLinks = ACCOUNT_SIDEBAR_LINKS.filter((l) => !l.action);
  const logoutLink = ACCOUNT_SIDEBAR_LINKS.find((l) => l.action === "log-out");

  return (
    <aside className="group lg:shrink-0 relative h-max w-55 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 py-5 backdrop-blur-sm transition-all duration-300 max-lg:flex max-lg:w-full max-lg:items-center max-lg:overflow-x-auto max-lg:overflow-y-hidden max-lg:py-0 max-lg:scrollbar-none max-lg:[&::-webkit-scrollbar]:hidden">
      <nav className="flex flex-col gap-1 max-lg:flex-row max-lg:gap-0">
        {mainLinks.map(({ id, label, href, icon: Icon }) => (
          <NavLink
            key={id}
            to={href}
            end={href === "/profile"}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-linear-to-r from-electric-600/35 via-electric-600/10 to-transparent text-white before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-electric-600 before:shadow-[0_0_12px_var(--color-electric-600)] max-lg:bg-linear-to-t max-lg:before:inset-y-auto max-lg:before:inset-x-0 max-lg:before:top-auto max-lg:before:bottom-0 max-lg:before:h-0.5 max-lg:before:w-auto"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={22} strokeWidth={1.6} className="max-lg:size-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {logoutLink && (
        <div className="mt-4 max-lg:mt-0 max-lg:flex max-lg:shrink-0 max-lg:items-center">
          <div className="mx-6 border-t border-ink-400/40 max-lg:mx-1 max-lg:h-6 max-lg:border-l max-lg:border-t-0" />
          <Link
            to={logoutLink.href}
            onClick={logout}
            className={`${linkBase} mt-4 w-full cursor-pointer text-white/70 hover:bg-linear-to-r hover:from-red-600/25 hover:via-red-500/10 hover:to-transparent hover:text-red-500 max-lg:mt-0 max-lg:w-auto max-lg:hover:bg-linear-to-t`}
          >
            <logoutLink.icon
              size={22}
              strokeWidth={1.6}
              className="max-lg:size-5"
            />
            <span>{logoutLink.label}</span>
          </Link>
        </div>
      )}
    </aside>
  );
};
