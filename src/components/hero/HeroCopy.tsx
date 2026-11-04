import { Link } from "react-router-dom";
import { Button, Eyebrow } from "@/components/ui";
import type { HeroCopyProps } from "@/types";

export const HeroCopy = ({
	copy,
	titleRef,
	copyRef,
	secondaryLink,
}: HeroCopyProps) => {
	return (
		<div
			className="pointer-events-auto absolute bottom-[8%] left-[6%] right-[6%] z-20 max-w-155 sm:right-auto sm:w-[88%]"
			ref={copyRef}
		>
			<Eyebrow text={copy.eyebrow} />
			<h2
				ref={titleRef}
				className="font-display text-[clamp(2.25rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
			>
				<span className="block">{copy.titleTop}</span>
				<span className="text-gradient-blue">{copy.titleBottom}</span>
			</h2>
			<p className="mt-8 max-w-105 text-base leading-7 text-(--ink-dim)">
				{copy.paragraph}
			</p>
			<div className="mt-10 flex flex-wrap items-center gap-5">
				<Button href="/marketplace" label={copy.cta} />
				{secondaryLink && (
					<Link
						to={secondaryLink.to}
						className="text-[10px] font-medium uppercase tracking-ultra text-white/50 transition-colors hover:text-white"
					>
						{secondaryLink.label}
					</Link>
				)}
			</div>
		</div>
	);
};
