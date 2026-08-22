import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { HERO_COPY, PRODUCTS } from "../../data/content";
import ProductCard from "./ProductCard";
import Eyebrow from "../ui/Eyebrow";
import { Button } from "../ui/Button";

export default function ProductGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
    <section id="explore" className="relative bg-[#07102b] py-[96px]">
      <div className="mx-auto max-w-[1600px] px-6">
        <Eyebrow text="Categories" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div
            ref={gridRef}
            className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4"
          >
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div
            ref={headerRef}
            className="flex flex-col gap-8 lg:w-[250px] lg:shrink-0"
          >
            <h2 className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.02em] text-white">
              Shop by <span className="text-gradient-blue">System</span>
            </h2>
            <p className="text-sm leading-6 text-[#c9d0e8]">
              Four engineered categories. Each piece designed to integrate —
              layer, carry, move, and protect.
            </p>
            <Button href="#explore" label={HERO_COPY.learn} />
          </div>
        </div>
      </div>
    </section>
  );
}
