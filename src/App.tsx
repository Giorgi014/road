import CinemaScroll from "./components/hero/CinemaScroll";
import ProductGrid from "./components/products/ProductGrid";
import MissionBlurb from "./components/products/MissionBlurb";
import AiFeatureSection from "./components/ai/AiFeatureSection";
import SiteFooter from "./components/layout/SiteFooter";

export default function App() {
  return (
    <main className="bg-[#05070f] text-[#f5f7ff]">
      <CinemaScroll />
      <section aria-label="Product types" className="bg-[#0d1233]">
        <ProductGrid />
        <MissionBlurb />
      </section>
      <AiFeatureSection />
      <SiteFooter />
    </main>
  );
}
