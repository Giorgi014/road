import { AiFeatureSection } from "../components/ai/AiFeatureSection";
import { CinemaScroll } from "../components/hero/CinemaScroll";
import { MissionBlurb } from "../components/products/MissionBlurb";
import { ProductGrid } from "../components/products/ProductGrid";

export function Home() {
  return (
    <main className="bg-[#030817] text-[#f5f7ff]">
      <CinemaScroll />
      <article aria-label="Product types" className="bg-[#0b1745]">
        <ProductGrid />
        <MissionBlurb />
      </article>
      <AiFeatureSection />
    </main>
  );
}
export default Home;
