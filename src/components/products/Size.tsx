import { SIZES } from "@/data";
import type { SizeFilterProps } from "@/types";

export const Size = ({ selected, onToggle }: SizeFilterProps) => {
	return (
		<article className="w-full">
			<p className="uppercase text-sm font-sans text-(--ink)">size</p>
			<section className="w-full flex gap-2.5 flex-wrap mt-2.5">
				{SIZES.map((item) => (
					<button
						type="button"
						key={item.id}
						aria-pressed={selected.includes(item.size)}
						onClick={() => onToggle(item.size)}
						className={`flex justify-center items-center w-10 h-7 border cursor-pointer hover:shadow-[0_0_5px_0px_var(--violet)] ${
							selected.includes(item.size)
								? "border-electric-300 bg-electric-500/25 text-white"
								: "border-electric-400/60"
						}`}
					>
						<span>{item.size}</span>
					</button>
				))}
			</section>
		</article>
	);
};
