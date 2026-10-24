import { AiFeatureSection } from "@/components/ai";
import { CinemaScroll } from "@/components/hero";
import { MissionBlurb, ProductGrid } from "@/components/products";

export function Home() {
  return (
    <main className="bg-ink-900 text-(--ink)">
      <CinemaScroll />
      <article aria-label="Product types" className="bg-ink-700">
        <ProductGrid />
        <MissionBlurb />
      </article>
      <AiFeatureSection />
    </main>
  );
}
export default Home;
