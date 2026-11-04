import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context";
import { ACCOUNT_SIDEBAR_LINKS } from "@/data";

export const ProfileNavigation = () => {
	const { logout } = useAuth();
	const mainLinks = ACCOUNT_SIDEBAR_LINKS.filter((l) => !l.action);
	const logoutLink = ACCOUNT_SIDEBAR_LINKS.find((l) => l.action === "log-out");
	return (
		<aside className="group relative h-max w-60 py-5 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 backdrop-blur-sm transition-all duration-300 max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:z-50 max-md:w-full max-md:h-auto max-md:max-h-[85vh] max-md:overflow-y-auto max-md:rounded-b-none max-md:rounded-t-2xl">
			<nav className="flex flex-col gap-1">
				{mainLinks.map(({ id, label, href, icon: Icon }) => (
					<NavLink
						key={id}
						to={href}
						end={href === "/profile"}
						className={({ isActive }) =>
							`relative flex items-center gap-4 px-7 py-4 text-sm uppercase tracking-wider transition-colors duration-200 ${
								isActive
									? "bg-linear-to-r from-electric-600/35 via-electric-600/10 to-transparent text-white before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-electric-600 before:shadow-[0_0_12px_var(--color-electric-600)]"
									: "text-white/70 hover:bg-white/5 hover:text-white"
							}`
						}
					>
						<Icon size={22} strokeWidth={1.6} />
						<span>{label}</span>
					</NavLink>
				))}
			</nav>

			{logoutLink && (
				<div className="mt-4">
					<div className="mx-6 border-t border-ink-400/40" />
					<Link
						to={logoutLink.href}
						onClick={logout}
						className="mt-4 flex w-full cursor-pointer items-center gap-4 px-7 py-4 text-sm uppercase tracking-wider text-white/70 transition-colors duration-200 hover:bg-linear-to-r hover:from-red-600/25 hover:via-red-500/10 hover:to-transparent hover:text-red-500"
					>
						<logoutLink.icon size={22} strokeWidth={1.6} />
						<span>{logoutLink.label}</span>
					</Link>
				</div>
			)}
		</aside>
	);
};
