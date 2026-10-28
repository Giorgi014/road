import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, getCategoryCards } from "@/lib";
import { HERO_COPY } from "@/data";
import { Button, Eyebrow, ProductCard } from "@/components/ui";
import { useData } from "@/context/data";

export const ProductGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { data } = useData();

  const categories = useMemo(() => getCategoryCards(data ?? []), [data]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      if (reduceMotion.matches) return;

      const cards = gridRef.current?.querySelectorAll(".product-card");
      if (cards) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        });
      }

      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: gridRef as React.RefObject<HTMLDivElement> },
  );

  return (
    <section id="explore" className="relative bg-ink-800 py-15">
      <div className="mx-auto max-w-[1600px] px-6">
        <Eyebrow text="Categories" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div
            ref={gridRef}
            className="grid flex-1 justify-center sm:justify-between grid-cols-[repeat(1,auto)] sm:grid-cols-[repeat(2,auto)] gap-3 md:grid-cols-[repeat(3,auto)] xl:grid-cols-[repeat(4,auto)]"
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
            className="flex flex-col gap-8 lg:w-[250px] lg:shrink-0"
          >
            <h2 className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.02em] text-white">
              Shop by <span className="text-gradient-blue">System</span>
            </h2>
            <p className="text-sm leading-6 text-(--ink-dim)">
              Four engineered categories. Each piece designed to integrate —
              layer, carry, move, and protect.
            </p>
            <Button href="#explore" label={HERO_COPY.learn} />
          </div>
        </div>
      </div>
    </section>
  );
};
