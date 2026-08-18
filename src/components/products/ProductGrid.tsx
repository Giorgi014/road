import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { PRODUCTS } from "../../data/content";
import ProductCard from "./ProductCard";
import Eyebrow from "../ui/Eyebrow";

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
    <section id="explore" className="relative bg-[#0a0e27] py-[96px]">
      <div className="mx-auto max-w-[1600px] px-6">
        <div
          ref={headerRef}
          className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Eyebrow text="Categories" />
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.02em] text-white">
              Shop by <span className="text-gradient-blue">System</span>
            </h2>
          </div>
          <p className="max-w-[448px] text-sm leading-6 text-[#a9b0d4]">
            Four engineered categories. Each piece designed to integrate —
            layer, carry, move, and protect.
          </p>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
