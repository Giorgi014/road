import { AiFeatureSection } from "@/components/ai";
import { HeroSection } from "@/components/hero";
import { MissionBlurb, ProductGrid } from "@/components/products";
import { HERO_COPY } from "@/data";
import VideoHero from "@/assets/hero.mp4";

export function Home() {
  return (
    <main className="bg-ink-900 text-(--ink)">
      <HeroSection
        id="cinema"
        ariaLabel="ROAD cinematic intro"
        copy={HERO_COPY}
        media={{ type: "video", src: VideoHero }}
        secondaryLink={{ to: "/about", label: "Our Story" }}
        showScrollIndicator
      />
      <article aria-label="Product types" className="bg-ink-700">
        <ProductGrid />
        <MissionBlurb />
      </article>
      <AiFeatureSection />
    </main>
  );
}
export default Home;
