import { JOURNEY_TIMELINE } from "@/data";
import type { TimelineProps } from "@/types";

export const Timeline = ({ className = "" }: TimelineProps) => {
  return (
    <section
      className={`relative rounded-2xl border border-ink-400/40 bg-ink-900/60 mt-10 px-6 py-6 sm:px-8 ${className}`}
    >
      <div className="mb-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-2.5 rotate-45 border border-electric-500/70"
        />
        <h2 className="text-sm uppercase tracking-widest text-electric-500">
          Our Journey
        </h2>
      </div>

      <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-1.75 hidden h-px bg-linear-to-r from-electric-500/80 via-electric-500/40 to-transparent md:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1.75 top-0 w-px bg-linear-to-b from-electric-500/80 to-transparent md:hidden"
        />
        {JOURNEY_TIMELINE.map(({ id, year, title, description }) => (
          <li key={id} className="relative pl-8 md:pl-0 md:pt-8">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 flex size-3.75 items-center justify-center rounded-full bg-electric-500/25 shadow-[0_0_16px_2px_rgba(104,71,255,0.55)]"
            >
              <span className="size-1.75 rounded-full bg-electric-500" />
            </span>

            <p className="text-lg text-electric-500">{year}</p>
            <h3 className="mt-1 font-display text-base uppercase tracking-wider text-(--ink)">
              {title}
            </h3>
            <p className="mt-2 max-w-49.25 text-sm leading-6 text-(--ink-dim)/70">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};
