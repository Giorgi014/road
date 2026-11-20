import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import { Button, Eyebrow, ProductCard } from "@/components/ui";
import { useData } from "@/context/data";
import { HERO_COPY } from "@/data";
import { useScrollReveal } from "@/hooks";
import { getCategoryCards, gsap } from "@/lib";

export const ProductGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { data } = useData();

  const categories = useMemo(() => getCategoryCards(data ?? []), [data]);

  useScrollReveal(headerRef, {
    target: (header) => Array.from(header.children),
    from: { x: 80, opacity: 0 },
    duration: 1.3,
    stagger: 0.3,
    ease: "power3.inOut",
  });

  useGSAP(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      gsap.from(grid.children, {
        yPercent: 40,
        opacity: 0,
        duration: 1.3,
        stagger: 0.1,
        ease: "power3.inOut",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          once: true,
        },
      });
    });

    mm.add("(max-width: 639px)", () => {
      gsap.utils.toArray<HTMLElement>(grid.children).forEach((card) => {
        gsap.from(card, {
          yPercent: 30,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });
    });
  });

  return (
    <article className="relative overflow-x-clip bg-ink-800 py-15">
      <div className="mx-auto max-w-[1600px] px-6">
        <Eyebrow text="Categories" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div
            ref={gridRef}
            className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {categories.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                src={item.imageSrc}
                alt={item.label}
                name={item.label}
                href={item.href}
                variant="category"
              />
            ))}
          </div>

          <div
            ref={headerRef}
            className="flex flex-col items-center gap-8 text-center lg:w-62.5 lg:shrink-0 lg:items-stretch lg:text-left"
          >
            <h2 className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.02em] text-white">
              Shop by <span className="text-gradient-blue">System</span>
            </h2>
            <p className="text-sm leading-6 text-(--ink-dim)">
              Four engineered categories. Each piece designed to integrate —
              layer, carry, move, and protect.
            </p>
            <Button href="/marketplace" label={HERO_COPY.learn} />
          </div>
        </div>
      </div>
    </article>
  );
};
