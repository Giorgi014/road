import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/context";
import { ACCOUNT_SIDEBAR_LINKS } from "@/data";

const linkBase =
  "relative flex shrink-0 items-center gap-4 whitespace-nowrap px-7 py-4 text-sm uppercase tracking-wider transition-colors duration-200 max-md:gap-2 max-md:px-4 max-md:py-3";

export const ProfileNavigation = () => {
  const { logout } = useAuth();
  const mainLinks = ACCOUNT_SIDEBAR_LINKS.filter((l) => !l.action);
  const logoutLink = ACCOUNT_SIDEBAR_LINKS.find((l) => l.action === "log-out");

  return (
    <aside className="group relative h-max w-60 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 py-5 backdrop-blur-sm transition-all duration-300 max-md:flex max-md:w-full max-md:items-center max-md:overflow-x-auto max-md:overflow-y-hidden max-md:py-0 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
      <nav className="flex flex-col gap-1 max-md:flex-row max-md:gap-0">
        {mainLinks.map(({ id, label, href, icon: Icon }) => (
          <NavLink
            key={id}
            to={href}
            end={href === "/profile"}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-linear-to-r from-electric-600/35 via-electric-600/10 to-transparent text-white before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-electric-600 before:shadow-[0_0_12px_var(--color-electric-600)] max-md:bg-linear-to-t max-md:before:inset-y-auto max-md:before:inset-x-0 max-md:before:top-auto max-md:before:bottom-0 max-md:before:h-0.5 max-md:before:w-auto"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={22} strokeWidth={1.6} className="max-md:size-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {logoutLink && (
        <div className="mt-4 max-md:mt-0 max-md:flex max-md:shrink-0 max-md:items-center">
          <div className="mx-6 border-t border-ink-400/40 max-md:mx-1 max-md:h-6 max-md:border-l max-md:border-t-0" />
          <Link
            to={logoutLink.href}
            onClick={logout}
            className={`${linkBase} mt-4 w-full cursor-pointer text-white/70 hover:bg-linear-to-r hover:from-red-600/25 hover:via-red-500/10 hover:to-transparent hover:text-red-500 max-md:mt-0 max-md:w-auto max-md:hover:bg-linear-to-t`}
          >
            <logoutLink.icon
              size={22}
              strokeWidth={1.6}
              className="max-md:size-5"
            />
            <span>{logoutLink.label}</span>
          </Link>
        </div>
      )}
    </aside>
  );
};
