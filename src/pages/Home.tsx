import { AiFeatureSection } from "../components/ai/AiFeatureSection";
import { CinemaScroll } from "../components/hero/CinemaScroll";
import { MissionBlurb } from "../components/products/MissionBlurb";
import { ProductGrid } from "../components/products/ProductGrid";

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
